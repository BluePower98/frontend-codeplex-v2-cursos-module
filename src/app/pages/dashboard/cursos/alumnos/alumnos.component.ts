import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentModalComponent } from './components/component-modal/component-modal.component';
import { CursosService } from '@services/api/alumnos/cursos.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  [x: string]: any;

  @ViewChild(ComponentListComponent, { static: false }) ComponentListComponent: ComponentListComponent

  constructor(
    private dialog: MatDialog,
    private CursosService: CursosService,
    private sweetAlertService: SweetAlertService
  ) { }
  ComponentModalComponent: any;

  ngOnInit(): void {
  }

  addAlumnos(dato: any) {
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,

    });
  }

  onEdit(data: any): void {
    console.log(data);
    this.CursosService.TraerData(data.idempresa, data.idalumno).subscribe(Response => {
      this.openModalForm({
        title: 'Editar',
        edit: true,
        item: Response
      })
    })
    console.log(data);
  }

  onDelete(data: any) {
    console.log("hola");
    const { idempresa, idalumno } = data
    this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult) => {
        if (rsult.isConfirmed) {

          this.CursosService.EliminarAlumno(idempresa, idalumno).subscribe(Response => {

            this.sweetAlertService.success('El Alumno fue eliminado Correctamente');
            this.ComponentListComponent.reloadTable(true);

          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(ComponentModalComponent, {
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

      this.ComponentListComponent.reloadTable(res.resetPaging);
    });


  }

}
