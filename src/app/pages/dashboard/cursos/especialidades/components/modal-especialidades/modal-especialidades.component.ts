import { Component, Inject, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BasicInformationFormComponent } from 'app/pages/dashboard/maintainers/products/components/products-modal/basic-information-form/basic-information-form.component';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { ErrorHandler, HttpErrorHandlerService } from "@core/services/http-error-handler.service";
import { catchError, finalize, of } from 'rxjs';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { EspecialidadesService } from '@services/api/especialidades/especialidades.service';

@Component({
  selector: 'app-modal-especialidades',
  templateUrl: './modal-especialidades.component.html',
  styleUrls: ['./modal-especialidades.component.scss']
})
export class ModalEspecialidadesComponent implements OnInit {

  @ViewChild(BasicInformationFormComponent, {static: true}) productsFormComponent: BasicInformationFormComponent;

  addedFiles: File[] = [];
  productImages: any[] = [];
  companyId: string;
  ruc: string;
  selectedTabIndex: number = 0;
  form: FormGroup;
  listaUbigeo:any[]=[];
  isNewRegister:boolean;
  opcionRegistrar: boolean = false;
  opcionEditar:boolean = false;


  constructor(private Especialidades: EspecialidadesService,
    private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService, 
    private fuseSplashScreenService: FuseSplashScreenService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEspecialidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.buildForm();
    this.isNewRegister =!this.data.edit;

    if(!this.isNewRegister){
      console.log('gg',this.data)
      this.form.patchValue(this.data.item[0]);
      this.opcionEditar = true;
  }
 if(this.isNewRegister){
// opcionRegistrar: boolean = ;
this.opcionRegistrar=true;
 }
  }

  onSelectedTabChange($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idespecialidad: [],
      descripcion: ['',Validators.required],
      activo: [true]
    });
  }

  onSubmit() {
    const body = this.form.value;
    console.log(body, "Hola Mundo");
    if(this.opcionRegistrar){
      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      this.Especialidades.RegistrarEspecialidades(body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})

    }
    if(this.opcionEditar){
      this.Especialidades.EditarEspecialidades(this.data.item[0].idempresa, this.data.item[0].idespecialidad, body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})
    }
  }


}
