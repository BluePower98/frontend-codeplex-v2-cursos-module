import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstructoresListComponent } from './components/instructores-list/instructores-list.component';
import { InstructoresService } from '@services/api/instructores/instructores.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { InstructoresModalComponent } from './components/instructores-modal/instructores-modal.component';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.scss']
})
export class InstructoresComponent implements OnInit {

  @ViewChild(InstructoresListComponent, {static: false}) InstructoresListComponent: InstructoresListComponent

  constructor(
    private dialog: MatDialog,
    private InstructoresService: InstructoresService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

  addInstructores(dato:any){
    console.log("clixk2");
    this.openModalForm({
      title: 'Registrar',
      edit: false,
     
    });
  }

  onEdit(data: any): void {
    console.log(data);
    this.InstructoresService.TraerData(data.idempresa,data.idinstructor).subscribe(Response=>{
      this.openModalForm({
        title:'Editar',
        edit:true,
        item:Response
      })
    })
    console.log(data);
  
  }

  onDelete(data:any)
  {
    console.log("hola");
    const { idempresa, idinstructor } = data
 this.sweetAlertService.confirm('¿Esta seguro de hacer esta accion?')
      .then((rsult)=>{
        if(rsult.isConfirmed){

          this.InstructoresService.EliminarInstructor(idempresa,idinstructor).subscribe(Response=>{
            
            this.sweetAlertService.success('El Intructor fue eliminado Correctamente');
            this.InstructoresListComponent.reloadTable(true);

          })
        }
      })

  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(InstructoresModalComponent, {
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

      this.InstructoresListComponent.reloadTable(res.resetPaging);
    });

    
  }

}
