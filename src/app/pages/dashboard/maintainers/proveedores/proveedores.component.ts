import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingController } from '@controllers/loading.controller';
import { ProveedoresService } from '@services/api/proveedores/proveedores.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { finalize } from 'rxjs';
import { ProveedoresModalComponent } from './components/proveedores-modal/proveedores-modal.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  ProveedoresModalComponent: any;
  EspecialidadesListComponent: any;

  constructor(private consultadni: ProveedoresService,private loadingCtrl: LoadingController,private sweetAlertService: SweetAlertService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  add(){
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,
     
    });
  }

  onEdit(data: any): void {
    // idempresa: "1-20539782232"
// razonsocial: "OVH CLOUD"
// rucdni: "99999999999"
    this.consultadni.TraerData(data.idempresa,data.rucdni).subscribe(Response=>{
      this.openModalForm({
        title:'Editar',
        edit:true,
        item:Response
      })
    })
    console.log(data);
    // this.editForm.emit(data);
  }

  onDelete(data:any)
  {
    console.log("hola");
    const { idempresa, rucdni } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.consultadni.EliminarProveedor(idempresa,rucdni).subscribe(Response=>{
            
            this.sweetAlertService.success('El Proveedor fue eliminado Correctamente')
          })
        }
      })

  }


  

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(ProveedoresModalComponent, {
      autoFocus: false,
      panelClass: 'fullscreen-mat-dialog',
      disableClose: true,
      width: '1350px',
      data
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      this.ProveedoresModalComponent.reloadTable(res.resetPaging);
    });

    
  }

}
