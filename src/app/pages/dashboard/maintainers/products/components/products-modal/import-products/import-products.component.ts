import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as XLSX from 'xlsx';

import { ImportProductsFormComponent } from './import-products-form/import-products-form.component';
import { ProductService } from '@services/api/product/product.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { Validation as ValidationUtil } from '@utils/validations.util';

const BASE_URL_API = environment.apiBaseUrl

@Component({
  selector: 'app-import-products',
  templateUrl: './import-products.component.html',
  styleUrls: ['./import-products.component.scss']
})
export class ImportProductsComponent implements OnInit {
  @ViewChild(ImportProductsFormComponent, { static: true }) formComponent: ImportProductsFormComponent;
  @Input() companyId: string;

  productTypes: Array<any> = [];
  displayedColumns: string[] = ['#', 'Codigo', 'Producto', 'Linea', 'SubLinea', 'Sunat', 'Activo', 'InfAd1', 'InfAd2', 'Percepcion', 'ISC', 'EstadoVenta', 'Combo'];
  countErrors: number = 0;
  productsList: Array<any> = [];
  productsListWithErrors: Array<any> = [];

  constructor(
    private productService: ProductService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.fetchProductTypes();
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
      const { idempresa, idtipoproducto } = formValues;

      return {
        ...item,
        IdEmpresa: idempresa,
        Idtipoproducto: idtipoproducto
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

  private setProductsData(rows: Array<any>) {

    const data = rows.length === 0 ? [] : rows.map((item: any) => {
      return {
        ...item,
        Sunat: '' + item.Sunat
      };
    });

    this.productsList = data.filter(item => this.checkValidValuesFromExcel(item));
    this.productsListWithErrors = data.filter(item => !this.checkValidValuesFromExcel(item));
    this.countErrors = this.productsListWithErrors.length;
  }

  private checkValidValuesFromExcel(item: any): boolean {
    return (
      ValidationUtil.isString(item.Producto) && 
      ValidationUtil.isString(item.Linea) && 
      ValidationUtil.isString(item.SubLinea) && 
      ValidationUtil.isString(item.Sunat) && 
      ValidationUtil.isString(item.Activo) && 
      ValidationUtil.isString(item.InfAd1) && 
      ValidationUtil.isString(item.InfAd2) && 
      ValidationUtil.isNumber(item.Percepcion) && 
      ValidationUtil.isNumber(item.ISC) && 
      ValidationUtil.isString(item.estadoventa) && 
      ValidationUtil.isString(item.combo)
    );
  }
}
