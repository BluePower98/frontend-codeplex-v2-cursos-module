import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EspecialidadesListComponent } from './components/especialidades-list/especialidades-list.component';
import { ModalEspecialidadesComponent } from './components/modal-especialidades/modal-especialidades.component';
import { EspecialidadesService } from '@services/api/especialidades/especialidades.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  @ViewChild(EspecialidadesListComponent, {static: false}) EspecialidadesListComponent: EspecialidadesListComponent



  constructor(private dialog: MatDialog,
    private EspecialidadesService: EspecialidadesService,
    private sweetAlertService: SweetAlertService) { }
  ModalEspecialidadesComponent:any;

  ngOnInit(): void {
  }
  addEspecialidades(dato:any){
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,
     
    });
  }
  onEdit(data: any): void {
    console.log(data);
    // idempresa: "1-20539782232"
// razonsocial: "OVH CLOUD"
// rucdni: "99999999999"
    this.EspecialidadesService.TraerData(data.idempresa,data.idespecialidad).subscribe(Response=>{
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
    const { idempresa, idespecialidad } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.EspecialidadesService.EliminarEspecialidad(idempresa,idespecialidad).subscribe(Response=>{
            
            this.sweetAlertService.success('La Especialidad fue eliminado Correctamente');
            this.EspecialidadesListComponent.reloadTable(true);

          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(ModalEspecialidadesComponent, {
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

      this.EspecialidadesListComponent.reloadTable(res.resetPaging);
    });

    
  }
}
