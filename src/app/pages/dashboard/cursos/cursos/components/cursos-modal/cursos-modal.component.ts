import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicInformationFormComponent } from 'app/pages/dashboard/maintainers/products/components/products-modal/basic-information-form/basic-information-form.component';
import { CursoService } from '@services/api/curso/curso.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html',
  styleUrls: ['./cursos-modal.component.scss']
})
export class CursosModalComponent implements OnInit {

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
  listaEspecialidades:any[]=[];

  constructor(
    private CursoService: CursoService,
    private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private fuseSplashScreenService: FuseSplashScreenService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CursosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.buildForm();
    this.loadEspecialidades();
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

  loadEspecialidades(){
    this.CursoService.TraerEspecialidad(this.companyId).subscribe(Response=>{this.listaEspecialidades = Response})
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idcurso: [],
      idespecialidad: [],
      descripcion: ['',Validators.required],
      activo: [true]
    });
  }

  onSubmit(){
    const body = this.form.value;
    console.log(body, "Hola Mundo");
    if(this.opcionRegistrar){
      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      this.CursoService.RegistrarCurso(body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})

    }
    if(this.opcionEditar){
      this.CursoService.EditarCurso(this.data.item[0].idempresa, this.data.item[0].idcurso, body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})
    }

  }

}


