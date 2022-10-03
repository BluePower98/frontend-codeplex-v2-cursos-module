import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentsListComponent } from './components/components-list/components-list.component';
import { CursoService } from '@services/api/curso/curso.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { CursosModalComponent } from './components/cursos-modal/cursos-modal.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  @ViewChild(ComponentsListComponent, { static: false }) ComponentsListComponent: ComponentsListComponent

  constructor(
    private dialog: MatDialog,
    private CursoService: CursoService,
    private sweetAlertService: SweetAlertService
  ) { }
  CursosModalComponent: any;

  ngOnInit(): void {
  }

  addCursos(dato: any) {
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,

    });
  }

  onEdit(data: any): void {
    console.log(data);
    this.CursoService.TraerData(data.idempresa, data.idcurso).subscribe(Response => {
      this.openModalForm({
        title: 'Editar',
        edit: true,
        item: Response
      })
    })
    console.log(data);
  }

  onDelete(data:any)
  {
    console.log("hola");
    const { idempresa, idcurso } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.CursoService.EliminarCurso(idempresa,idcurso).subscribe(Response=>{
            
            this.sweetAlertService.success('El Curso fue eliminado Correctamente');
            this.ComponentsListComponent.reloadTable(true);
          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(CursosModalComponent, {
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
