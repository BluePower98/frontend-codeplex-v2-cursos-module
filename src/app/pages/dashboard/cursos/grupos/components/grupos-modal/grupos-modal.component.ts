import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicInformationFormComponent } from 'app/pages/dashboard/maintainers/products/components/products-modal/basic-information-form/basic-information-form.component';
import { GruposService } from '@services/api/grupos/grupos.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { HttpErrorHandlerService } from '@core/services/http-error-handler.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-grupos-modal',
  templateUrl: './grupos-modal.component.html',
  styleUrls: ['./grupos-modal.component.scss']
})
export class GruposModalComponent implements OnInit {

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
  listacursos:any[]=[];
  listaModenas:any[]=[];

  constructor(
    private GruposService: GruposService,
    private toastNotificationService: ToastNotificationService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GruposModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    
    this.buildForm();
    this.loadcursos();
    this.loadMonedas();

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

  loadcursos(){
    this.GruposService.TraerCursos(this.companyId).subscribe(Response=>{this.listacursos = Response})
  }

  loadMonedas(){
    this.GruposService.TraerMonedas().subscribe(Response=>{this.listaModenas = Response;console.log(Response);})
    
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }
  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idgrupo: [],
      idcurso: [],
      nombre: [],
      fecha_inicio: ['',Validators.required],
      fecha_fin: ['',Validators.required],
      duracion: ['',Validators.required],
      horario: ['',Validators.required],
      beneficios: ['',Validators.required],
      costo: ['',Validators.required],
      idmoneda: [1],
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

      this.GruposService.registrarGrupos(body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})

    }
    if(this.opcionEditar){
      this.GruposService.EditarGrupos(this.data.item[0].idempresa, this.data.item[0].idgrupo, body).subscribe(Response=>{this.toastNotificationService.success(Response.message);this.dialogRef.close({ resetPaging: this.data.edit });})
    }
  }

}
