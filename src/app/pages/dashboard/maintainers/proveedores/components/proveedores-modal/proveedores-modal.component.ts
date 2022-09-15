import { Component, Inject, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BasicInformationFormComponent } from '../../../products/components/products-modal/basic-information-form/basic-information-form.component';
import { ProveedoresService } from '@services/api/proveedores/proveedores.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { ErrorHandler, HttpErrorHandlerService } from "@core/services/http-error-handler.service";
import { catchError, finalize, of } from 'rxjs';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';

@Component({
  selector: 'app-proveedores-modal',
  templateUrl: './proveedores-modal.component.html',
  styleUrls: ['./proveedores-modal.component.scss']
})
export class ProveedoresModalComponent implements OnInit {
  @ViewChild(BasicInformationFormComponent, {static: true}) productsFormComponent: BasicInformationFormComponent;

  companyId: string;
  ruc: string;
  selectedTabIndex: number = 0;
  form: FormGroup;
  listaUbigeo:any[]=[];
  isNewRegister:boolean;
  opcionRegistrar: boolean = false;
  opcionEditar:boolean = false;

  constructor( private consultadni: ProveedoresService, private toastNotificationService: ToastNotificationService, private httpErrorHandlerService: HttpErrorHandlerService,private sweetAlertService: SweetAlertService, private fuseSplashScreenService: FuseSplashScreenService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.buildForm();
    this.ruc = sessionStorage.getItem('ruc');
    this.isNewRegister =!this.data.edit;

    if(!this.isNewRegister){
        console.log('gg',this.data)
        this.form.patchValue(this.data.item[0]);
        this.OnChangesRucDni2(this.data.item[0].rucdni);
        this.opcionEditar = true;
    }
   if(this.isNewRegister){
  // opcionRegistrar: boolean = ;
  this.opcionRegistrar=true;
   }

    this.OnChangesRucDni();

  }


  onSelectedTabChange($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }

  // activo: 1
  // codigo: "5151"
  // direccion: "AV. PERU NRO. 776"
  // email: null
  // estadosunat: 0
  // idempresa: "1-20539782232"
  // idsunatt35: null
  // idtipodocidentidad: 6
  // idtipoproveedor: 1
  // nombrecomercial: "aduni"
  // razonsocial: "ADUNI-A"
  // rucdni: "20527869758"
  // telefono: null
  // ubigeo: "030201"

  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      rucdni: ['',Validators.required],
      codigo: [''],
      idtipodocidentidad: [''],
      activo: [''],
      direccion: ['',Validators.required],
      email: [''],
      estadosunat: [''],
      idsunatt35: [''],
      idtipoproveedor: [1],
      nombrecomercial: [''],
      razonsocial: ['',Validators.required],
      telefono: [''],
      ubigeo: [''],

    });
  }

  onSubmit() {
    const {body} = this.form.value;
    console.log(body, "Hola mundo");
    if(this.opcionRegistrar){
      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      this.consultadni.RegistrarProveedores(body).subscribe(Response=>{this.toastNotificationService.success(Response.message);})
    
    }
    if(this.opcionEditar){
      this.consultadni.EditarProveedores(this.data.item[0].idempresa, this.data.item[0].rucdni, body).subscribe(Response=>{this.toastNotificationService.success(Response.message);})
    }

  }
  OnChangesRucDni2(rucdni:string){
    this.httpErrorHandlerService.setHandler(ErrorHandler.manual);
    if(rucdni.trim().length == 8 || rucdni.trim().length == 11 ) {
      this.consultadni.ConsultarDni(rucdni)
            .subscribe(
              Response => {
                console.log(Response);
                this.form.patchValue({razonsocial:Response.data.nombrerazon, direccion:Response.data.direccion})
                if(Response.data.rucdni.trim().length==11){
                     this.form.patchValue({idtipodocidentidad:'6'});
                    // 0 Then 'HABIDO' When 1 Then 'NO HABIDO' Else 'DE BAJA'
                    if(Response.data.condicion.includes('HABIDO')){
                      this.form.patchValue({estadosunat:'0'});
                    }else if(Response.data.condicion.includes('NO HABIDO')){
                      this.form.patchValue({estadosunat:'1'});
                    }else{
                      this.form.patchValue({estadosunat:'2'});
                    }
                    if(Response.data.estado.includes('ACTIVO')){
                      this.form.patchValue({activo:true});
                    }else{
                      this.form.patchValue({activo:false});
                    }
                    this.consultadni.Ubigeo(Response.data.ubigeo)
                        .subscribe(r=>{
                          this.listaUbigeo=r;
                      this.form.patchValue({ubigeo:Response.data.ubigeo});

                        })

                }
                if(Response.data.rucdni.trim().length==8){
                  this.form.patchValue({idtipodocidentidad:'1'});
                }

                
    })};
  } 
  OnChangesRucDni(){
    this.form.get('rucdni').valueChanges.subscribe(rucd => {
      console.log("hola2");
      if(rucd) {
        this.httpErrorHandlerService.setHandler(ErrorHandler.manual);
        if(rucd.trim().length == 8 || rucd.trim().length == 11 ) {
          this.consultadni.ConsultarDni(rucd)
                .subscribe(
                  Response => {
                    console.log(Response);
                    this.form.patchValue({razonsocial:Response.data.nombrerazon, direccion:Response.data.direccion})
                    if(Response.data.rucdni.trim().length==11){
                         this.form.patchValue({idtipodocidentidad:'6'});
                        // 0 Then 'HABIDO' When 1 Then 'NO HABIDO' Else 'DE BAJA'
                        if(Response.data.condicion.includes('HABIDO')){
                          this.form.patchValue({estadosunat:'0'});
                        }else if(Response.data.condicion.includes('NO HABIDO')){
                          this.form.patchValue({estadosunat:'1'});
                        }else{
                          this.form.patchValue({estadosunat:'2'});
                        }
                        if(Response.data.estado.includes('ACTIVO')){
                          this.form.patchValue({activo:true});
                        }else{
                          this.form.patchValue({activo:false});
                        }
                        this.consultadni.Ubigeo(Response.data.ubigeo)
                            .subscribe(r=>{
                              this.listaUbigeo=r;
                          this.form.patchValue({ubigeo:Response.data.ubigeo});

                            })

                    }
                    if(Response.data.rucdni.trim().length==8){
                      this.form.patchValue({idtipodocidentidad:'1'});
                    }

                    
        })};
        
      }
    })
  }



}
