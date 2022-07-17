import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BarcodeScannerLivestreamOverlayComponent } from 'ngx-barcode-scanner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { PricesZoneService } from '@services/api/prices-zone/prices-zone.service';
import { ProductService } from '@services/api/product/product.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { LinesComponent } from './modals/lines/lines.component';
import { SubLinesComponent } from './modals/sub-lines/sub-lines.component';
import { ProductsModalComponent } from '../products-modal.component';
import { tap, Observable } from 'rxjs';

@Component({
  selector: 'app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss']
})
export class BasicInformationFormComponent implements OnInit {


  @ViewChild('linesSelect', {static: false}) linesSelect: NgSelectComponent;
  @ViewChild('subLinesSelect', {static: false}) subLinesSelect: NgSelectComponent;

  @ViewChild(BarcodeScannerLivestreamOverlayComponent) 
  barecodeScannerOverlay: BarcodeScannerLivestreamOverlayComponent;

  @Input() data: any;
  @Input() companyId: string;
  @Input() ruc: string;

  form: FormGroup;
  isNewRegister: boolean;
  errorMatcher = new MyErrorStateMatcher();  
  addedFiles: File[] = [];
  productTypeList$: Observable<Array<any>>;
  lineList: any[] = [];
  subLineList: any[] = [];
  sunatt07List$: Observable<Array<any>>;
  firstLoadedSubLinesData: boolean = false;
  product: any;
  productImages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductsModalComponent>,
    private sweetAlertService: SweetAlertService,
    private toastNotificationService: ToastNotificationService,
    private productService: ProductService,
    private pricesZoneService: PricesZoneService
  ) {
  }

  ngOnInit(): void {
    this.isNewRegister = !this.data.edit;
    this.product = this.data.item;
    this.productImages = this.product?.images || [];

    this.buildForm();

    if (this.isNewRegister) {
      this.addPricesItem();
    }

    if (!this.isNewRegister) {
      this.form.patchValue(this.product);
      this.initPricesZoneData();
    }

    this.fetchProductTypesData();
    this.fetchSunatt07Data();
    
    console.log('Product form', {data: this.data, isNewRegister: this.isNewRegister});
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  get itemPrecios(): FormArray {
    return this.form.get('itemPrecios') as FormArray;
  }

  onChangeProductType($event?: any): void {
    this.f.idtipoproducto.patchValue($event?.Id);
    this.fetchLinesData();
  }

  onChangeLineas($event: any): void {
    const value = $event ? $event.Id : null;

    console.log('onChangeLineas', {value});

    this.f.idlinea.patchValue(value);

    if (!value) {
      this.subLineList = [];
      this.f.idlineasub.patchValue(null);
      return;
    }

    this.fetchSubLinesData();
  }

  onChangeLineassub($event: any): void {
    const value = $event ? $event.Id : null;

    this.f.idlineasub.patchValue(value);
  }

  onChangeSunatt07($event: any): void {
    this.f.idsunatt07.patchValue($event.Id);
  }

  generateProductCode(): void {
    const { idtipoproducto, idlinea, idlineasub } = this.form.value;

    this.productService.getCodigoProducto(this.companyId, idtipoproducto, idlinea, idlineasub)
      .subscribe(({ code }) => {
        this.f.codigo.patchValue(code);
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.itemPrecios.controls.length === 0) {
      this.sweetAlertService.error('Debe añadir al menos una lista de precios.');
      return;
    }

    if (this.existsDuplicatedPrices()) {
      this.sweetAlertService.error('Hay duplicidad(por zona-medida-tipo precio) de información en los precios que se desean agregar.');
      return;
    }

    console.log('onSubmit success', {values: this.form.value, addedFiles: this.addedFiles});

    const action: string = this.data.edit ? 'M02' : 'M01';
    const uploadPath: string = `empresas_profile/${this.ruc}/${'Logistica.Net'}/ProductosForm/`;
    
    this.enableBarcodeInputs();

    this.productService.CreateUpdateProductos(
      this.form.value,
      action,
      this.addedFiles,
      uploadPath
    )
      .subscribe(res => {

        console.log('CreateUpdateProductos', res);

        this.toastNotificationService.success(res.message);

        this.dialogRef.close({ resetPaging: this.data.edit });

        /* this.notificationsService.showNotification('bottom', 'right', response.message, 2);
        if (!this.data.edit) {
          SweetAlert.confirm('¿Desea agregar otro producto?')
            .then(result => {
              if (result.value) {
                this.ngOnInit();
              } else {
                this.dialogRef.close({ resetPaging: this.data.edit });
              }
            });
        } else {
          this.dialogRef.close({ resetPaging: this.data.edit });
        } */
      });
  }

  onUpdateFiles(files: File[]): void {
    this.addedFiles = files;
  }

  addPricesItem(data?: any): void {
    this.itemPrecios.push(this.buildPricesZoneForm(data));
  }

  removeItemPrice(index: number): void {
    this.itemPrecios.removeAt(index);
  }

  removeAddedItemPrice(index: any): void {
    console.log('removeAddedItemPrice', index);
  }

  onValueChangesBarcodeScanner(code: string, index: number): void {
    this.itemPrecios.controls[index]['controls']['codigoBarra'].patchValue(code);
  }

  openModalNewLines(): void {
    this.linesSelect.close();

    console.log('openModalNewLines - open');

    const { idtipoproducto } = this.form.value;

    const dialogRef = this.dialog.open(LinesComponent, {
      panelClass: 'custom-modalbox',
      autoFocus: true,
      width: '900px',
      data: {
        companyId: this.companyId,
        idtipoproducto: Number(idtipoproducto)
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res?.refreshData) {
        this.fetchLinesData();
      }

      console.log('openModalNewLines - close', {res});
    });
  }

  openModalNewSubLines(): void {
    console.log('openModalNewSubLines', this.linesSelect.items);

    this.subLinesSelect.close();

    const { idtipoproducto, idlinea } = this.form.value;

    const line = this.linesSelect.items.find(item => item.Id === idlinea);

    const dialogRef = this.dialog.open(SubLinesComponent, {
      autoFocus: true,
      data: {
        title: `${line.ItemName} - Registro de Sub-Lineas`,
        companyId: this.companyId,
        idtipoproducto: Number(idtipoproducto),
        idlinea: Number(idlinea)
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res?.refreshData) {
        this.fetchSubLinesData();
      }

      console.log('openModalNewSubLines - close', {res});
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idproducto: [null],
      idlinea: [0, Validators.required],
      idlineasub: [0, Validators.required],
      idtipoproducto: [0, Validators.required],
      idsunatt07: [''],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: [1],
      infad1: [''],
      infad2: [''],
      infad3: [''],
      porpercepcion: [0],
      porisc: [0],
      estadoventa: [1],
      escombo: [0],
      icbper: [0],
      itemPrecios: this.fb.array([])
    });
  }

  private fetchProductTypesData(): void {
    this.productTypeList$ = this.productService.getComboTipoproductos()
      .pipe(
        tap((res: Array<any>) => {
          const productTypeId = this.isNewRegister ? (this.data?.productTypeIdSelected || 1) : this.product.idtipoproducto;
          const productType = res.find(item => item.Id === productTypeId);

          this.onChangeProductType(productType);  
        })
      );
  }

  private fetchLinesData(): void {
    const { idtipoproducto } = this.form.value;

    this.lineList = [];

    this.productService.getComboLineas(this.companyId, idtipoproducto)
      .subscribe((res: any[]) => {
        this.lineList = res;
        this.subLineList = [];

        if (res.length === 0) {
          this.f.idlinea.patchValue(null);
          this.f.idlineasub.patchValue(null);
          return;
        }

        const line = this.isNewRegister ? res[0] : res.find(item => item.Id === this.product.idlinea);

        this.onChangeLineas(line);
      });
  }

  private fetchSubLinesData(): void {
    const { idtipoproducto, idlinea } = this.form.value;

    this.subLineList = [];

    console.log('fetchSubLinesData', {idlinea});

    this.productService.getComboLineassub(this.companyId, idtipoproducto, idlinea)
      .subscribe((res: any[]) => {
        this.subLineList = res;


        console.log(res);

        if (res.length === 0) {
          this.f.idlineasub.patchValue(null);
          return;
        }

        const subLine = this.isNewRegister ? res[0] : res.find(item => item.Id === this.product.idlineasub);
        this.onChangeLineassub(subLine);

        if (this.isNewRegister && !this.firstLoadedSubLinesData) {
          this.firstLoadedSubLinesData = true;
          this.generateProductCode();
        }
      });
  }

  private fetchSunatt07Data(): void {
    this.sunatt07List$ = this.productService.getComboSunatt07()
      .pipe(
        tap((res: Array<any>) => {
          if (res.length > 0 && !this.isNewRegister) {
            this.f.idsunatt07.patchValue(res[0].Id);
            this.onChangeSunatt07(res[0]);
          }  
        })
      );
  }

  private buildPricesZoneForm(data?: any): FormGroup {
    return this.fb.group({
      idempresa: this.companyId,
      idproducto: [this.f.idproducto.value],
      idzona: [data?.idzona || 0, Validators.required],
      idmedida: [data?.idmedida || 0, Validators.required],
      idtipoprecio: [data?.idtipoprecio || 0, Validators.required],
      codigoBarra: [
        {
          value: data?.codigoBarra || '',
          disabled: false
        }
      ],
      precioVenta: [data?.precioVenta || 0, Validators.required],
      cantidadMinVen: [!data ? 1 : data && Number(data.cantidadMinVen), Validators.required],
      incluidoIgv: [data?.incluidoIgv || 1],
      defecto: [data?.defecto || 0]
    });
  }

  private enableBarcodeInputs(): void {
    this.itemPrecios.controls.forEach((form: FormGroup) => {
      form.controls['codigoBarra'].enable();
    });
  }

  private existsDuplicatedPrices(): boolean {
    const uniques: any[] = this.itemPrecios.value.filter((obj: any, index: number, self: any[]) => {
      return index === self.findIndex((value: any) => {
        return (
          value['idzona'] === obj['idzona'] &&
          value['idtipoprecio'] === obj['idtipoprecio'] &&
          value['idmedida'] === obj['idmedida']
        );
      });
    });

    return uniques.length !== this.itemPrecios.value.length;
  }

  private initPricesZoneData(): void {
    const { idproducto } = this.form.value;

    this.pricesZoneService.getZonasprecios(this.companyId, idproducto)
      .subscribe((data: any[]) => {
        data.forEach((item) => {
          this.addPricesItem(item);
        });

        // this.listaAgregados = [];
      });
  }
}
