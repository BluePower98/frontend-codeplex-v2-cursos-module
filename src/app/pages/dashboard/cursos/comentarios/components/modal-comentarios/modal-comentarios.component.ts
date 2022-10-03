import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ComentariosListComponent } from '../comentarios-list/comentarios-list.component';
import { ComentariosService } from '@services/api/comentarios/comentarios.service';
import { BasicInformationFormComponent } from 'app/pages/dashboard/maintainers/products/components/products-modal/basic-information-form/basic-information-form.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as moment from 'moment';
import { Moment } from 'moment';


@Component({
  selector: 'app-modal-comentarios',
  templateUrl: './modal-comentarios.component.html',
  styleUrls: ['./modal-comentarios.component.scss']
})
export class ModalComentariosComponent implements OnInit {
  @ViewChild(ComentariosListComponent, { static: false }) ComentariosListComponent: ComentariosListComponent

  @ViewChild(BasicInformationFormComponent, { static: true }) productsFormComponent: BasicInformationFormComponent;

  addedFiles: File[] = [];
  productImages: any[] = [];
  companyId: string;
  ruc: string;
  selectedTabIndex: number = 0;
  form: FormGroup;
  listaUbigeo: any[] = [];
  isNewRegister: boolean;
  opcionRegistrar: boolean = false;
  opcionEditar: boolean = false;


  constructor(
    private ComentariosService: ComentariosService,
    private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private fuseSplashScreenService: FuseSplashScreenService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.buildForm();
    let fecha2;
    fecha2 = moment(new Date()).format('YYYY-MM-DD');
    this.form.patchValue({ fecha: fecha2 });


    this.isNewRegister = !this.data.edit;

    if (!this.isNewRegister) {
      console.log('gg', this.data)
      const fecha = moment(this.data.item[0].fecha).format('YYYY-MM-DD');
      const body = { ...this.data.item[0], fecha };
      this.form.patchValue(body);
      this.opcionEditar = true;
    }
    if (this.isNewRegister) {
      this.opcionRegistrar = true;
    }
  }

  onSelectedTabChange($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }


  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idcomentarios: [],
      email: ['', Validators.required],
      mensaje: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  get f(): { [key: string]: FormControl } {
    return this.form.controls as { [key: string]: FormControl };
  }

  onSubmit() {
    const body = this.form.value;
    console.log(body, "Hola Mundo");
    if (this.opcionRegistrar) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      this.ComentariosService.RegistrarComentarios(body).subscribe(Response => { this.toastNotificationService.success(Response.message); this.dialogRef.close({ resetPaging: this.data.edit }); })
    }

    if (this.opcionEditar) {
      this.ComentariosService.EditarComentarios(this.data.item[0].idempresa, this.data.item[0].idcomentarios, body).subscribe(Response => { this.toastNotificationService.success(Response.message); this.dialogRef.close({ resetPaging: this.data.edit }); })
    }
  }

}
