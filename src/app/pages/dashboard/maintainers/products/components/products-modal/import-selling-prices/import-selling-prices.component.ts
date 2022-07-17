import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as XLSX from 'xlsx';

import { ProductService } from '@services/api/product/product.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { Validation as ValidationUtil } from '@utils/validations.util';
import { ImportSellingPricesFormComponent } from './import-selling-prices-form/import-selling-prices-form.component';
import { PricesZoneService } from '@services/api/prices-zone/prices-zone.service';

const BASE_URL_API = environment.apiBaseUrl

@Component({
  selector: 'app-import-selling-prices',
  templateUrl: './import-selling-prices.component.html',
  styleUrls: ['./import-selling-prices.component.scss']
})
export class ImportSellingPricesComponent implements OnInit {

  @ViewChild(ImportSellingPricesFormComponent, { static: true }) formComponent: ImportSellingPricesFormComponent;
  @Input() companyId: string;

  productTypes: Array<any> = [];
  zones: Array<any> = [];
  
  displayedColumns: string[] = ['#', 'CodigoProducto', 'Producto', 'CodigoBarra', 'Medida', 'Equivalencia', 'Precio_venta', 'Cantidad', 'IncIGV', 'Defecto', 'TipoPrecio'];
  countErrors: number = 0;
  productsList: Array<any> = [];
  productsListWithErrors: Array<any> = [];

  constructor(
    private productService: ProductService,
    private pricesZoneService: PricesZoneService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.fetchProductTypes();
    this.fetchZones();
  }

  uploadFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(reader.result as any);
      const arr = [];
      const count = data.length;

      for (var i = 0; i != count; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const workbook = XLSX.read(arr.join(""), {
        type: "binary",
        cellDates: true,
        cellNF: false,
        cellText: false
      });

      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true });
      
      this.setProductsData(rows);
    };

    reader.readAsArrayBuffer(file);
  }

  downloadTemplateExcel(fileName: string): void {
    const url: string = `${BASE_URL_API}/Ficheros_Formato/download?filename=${fileName}`;
    
    window.open(url, 'Download');
  }

  uploadData(formValues: any): void {
    const data = this.productsList.map((item: any) => {
      const { idempresa, idtipoproducto, id_zona: zoneId } = formValues;

      return {
        ...item,
        IdEmpresa: idempresa,
        Idtipoproducto: idtipoproducto,
        IdZona: zoneId
      };
    });

    this.productService.importDataProducto(data)
      .subscribe(
        (res: any) => {
          this.toastNotificationService.success(res);
          this.formComponent.resetInputFile();
          this.productsList = [];
          this.productsListWithErrors = [];
        },
        (err: HttpErrorResponse) => {
          console.log('ERROR - importDataProducto', err);
        }
      )
  }

  deleteImportedProducts(formValues: any): void {
    const { idempresa, idtipoproducto } = formValues;

    this.productService.deleteDataProducto(idempresa, idtipoproducto)
            .subscribe((res: any) => this.toastNotificationService.success(res.message));
  }

  get isEnableUploadData(): boolean {
    return this.countErrors === 0 && this.productsList.length > 0;
  }

  private fetchProductTypes(): void {
    this.productService.getComboTipoproductos()
      .subscribe((res: any[]) => this.productTypes = res);
  }

  private fetchZones() {
    this.pricesZoneService.getComboZonas(this.companyId)
      .subscribe((res: any[]) => this.zones = res);
  }

  private setProductsData(rows: Array<any>) {
    this.productsList = rows.filter(item => this.checkValidValuesFromExcel(item));;
    this.productsListWithErrors = rows.filter(item => !this.checkValidValuesFromExcel(item));
    this.countErrors = this.productsListWithErrors.length;
  }

  private checkValidValuesFromExcel(item: any): boolean {
    return (
      ValidationUtil.isString(item.CodigoProducto.toString()) && 
      item.Producto &&
      ValidationUtil.isString(item?.CodigoBarra?.toString()) && 
      ValidationUtil.isString(item.Medida) && 
      ValidationUtil.isNumber(item.Equivalencia) &&
      ValidationUtil.isNumber(item.Precio_venta) &&
      ValidationUtil.isNumber(item.Cantidad) &&
      ValidationUtil.isString(item.IncIGV) &&
      ValidationUtil.isString(item.Defecto) &&
      ValidationUtil.isString(item.TipoPrecio)
    );
  }
}
