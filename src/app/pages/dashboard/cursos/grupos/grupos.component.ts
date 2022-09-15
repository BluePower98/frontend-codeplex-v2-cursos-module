import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentsListComponent } from '../grupos/components/components-list/components-list.component';
import { GruposService } from '@services/api/grupos/grupos.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { GruposModalComponent } from './components/grupos-modal/grupos-modal.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  @ViewChild(ComponentsListComponent, {static: false}) ComponentsListComponent: ComponentsListComponent

  constructor(
    private dialog: MatDialog,
    private GruposService: GruposService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

  addGrupos(dato:any){
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,
     
    });
  }
  onEdit(data: any): void {
    console.log(data);
    this.GruposService.TraerData(data.idempresa,data.idgrupo).subscribe(Response=>{
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
    const { idempresa, idgrupo } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.GruposService.EliminarGrupo(idempresa,idgrupo).subscribe(Response=>{
            
            this.sweetAlertService.success('La Especialidad fue eliminado Correctamente');
            this.ComponentsListComponent.reloadTable(true);

          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(GruposModalComponent, {
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

      this.ComponentsListComponent.reloadTable(res.resetPaging);
    });

    
  }

}
