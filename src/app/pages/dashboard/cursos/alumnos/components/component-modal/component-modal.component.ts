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
import { CursosService } from '@services/api/alumnos/cursos.service';
import * as moment from 'moment';
import { Moment } from 'moment';


@Component({
  selector: 'app-component-modal',
  templateUrl: './component-modal.component.html',
  styleUrls: ['./component-modal.component.scss']
})
export class ComponentModalComponent implements OnInit {
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

  constructor(private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private fuseSplashScreenService: FuseSplashScreenService,
    private CursosService: CursosService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComponentModalComponent>,
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
      idalumno: [],
      rucdni: ['',Validators.required],
      apellidos: [''],
      nombres: [''],
      foto: [''],
      fecha_registro: ['',Validators.required],
      activo: [true],
    });
  }

  onUpdateFiles(files: File[]): void {
    this.addedFiles = files;
  }


  onSubmit() {
    
    let fecha_registro=moment(this.form.get('fecha_registro')?.value).format('YYYY-MM-DD');
    // this.form.patchValue({fecha:fecha2});
    
    const body = {...this.form.value,fecha_registro};
    console.log(body, "Hola Mundo");
    const path_certificado=`FotoAlumno`;
    if(this.opcionRegistrar){
      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      this.CursosService.RegistrarAlumnos(body,this.addedFiles, path_certificado).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})

    }
    if(this.opcionEditar){
      this.CursosService.EditarAlumno(this.data.item[0].idempresa, this.data.item[0].idalumno, body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})
    }
  }
  

}
