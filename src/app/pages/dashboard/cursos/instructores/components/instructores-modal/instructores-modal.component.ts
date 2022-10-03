import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicInformationFormComponent } from 'app/pages/dashboard/maintainers/products/components/products-modal/basic-information-form/basic-information-form.component';
import { InstructoresService } from '@services/api/instructores/instructores.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-instructores-modal',
  templateUrl: './instructores-modal.component.html',
  styleUrls: ['./instructores-modal.component.scss']
})
export class InstructoresModalComponent implements OnInit {

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
    private InstructoresService: InstructoresService,
    private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private fuseSplashScreenService: FuseSplashScreenService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InstructoresModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.buildForm();
    this.isNewRegister = !this.data.edit;

    if (!this.isNewRegister) {
      console.log('gg', this.data)
      this.form.patchValue(this.data.item[0]);
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
      idinstructor: [],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      foto: [''],
      detalle: [''],
      activo: [true]
    });
  }

  onUpdateFiles(files: File[]): void {
    this.addedFiles = files;
  }


  onSubmit() {
    const body = this.form.value;
    console.log(body, "Hola Mundo");
    const path_certificado = `FotoInstructor`;
    if (this.opcionRegistrar) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      this.InstructoresService.RegistrarInstructores(body, this.addedFiles, path_certificado).subscribe(Response => { this.toastNotificationService.success(Response.message); this.dialogRef.close({ resetPaging: this.data.edit }); })
    }

    if (this.opcionEditar) {
      this.InstructoresService.EditarInstructores(this.data.item[0].idempresa, this.data.item[0].idinstructor, body).subscribe(Response => { this.toastNotificationService.success(Response.message); this.dialogRef.close({ resetPaging: this.data.edit }); })
    }

  }
}
