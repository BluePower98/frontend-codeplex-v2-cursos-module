import { Component, OnInit, ViewChild } from '@angular/core';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ComentariosListComponent } from './components/comentarios-list/comentarios-list.component';
import { ComentariosService } from '@services/api/comentarios/comentarios.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComentariosComponent } from './components/modal-comentarios/modal-comentarios.component';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  @ViewChild(ComentariosListComponent, {static: false}) ComentariosListComponent: ComentariosListComponent

  constructor(
    private dialog: MatDialog,
    private ComentariosService: ComentariosService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    
  }

  addComentarios(dato:any){
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,
     
    });
  }

  onEdit(data: any): void {
    console.log(data);
    this.ComentariosService.TraerData(data.idempresa,data.idcomentarios).subscribe(Response=>{
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
    const { idempresa, idcomentarios } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.ComentariosService.EliminarComentarios(idempresa,idcomentarios).subscribe(Response=>{
            
            this.sweetAlertService.success('El comentario fue eliminado Correctamente');
            this.ComentariosListComponent.reloadTable(true);
          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(ModalComentariosComponent, {
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

      this.ComentariosListComponent.reloadTable(res.resetPaging);
    });

    
  }

}
