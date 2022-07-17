import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { ToastNotificationService } from '@services/ui/toast-notification.service';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.scss']
})
export class DatatablesComponent implements OnInit {
  constructor(
    private sweetAlertService: SweetAlertService,
    private dialog: MatDialog,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {}

  add(): void {
    this.openModalForm({
      title: 'Registrar',
      edit: false,
    });
  }

  onEdit(data: any): void {
    console.log('Action button: edit', { ...data });

    this.openModalForm({
      title: 'Editar',
      edit: true,
      data
    });
  }

  onDelete(data: any): void {
    console.log('Action button: delete', { ...data });

    this.sweetAlertService.confirm(
      'Are you sure you want to remove this contact permanently?',
      { title:  'Remove contact'}
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.toastNotificationService.success('Registro eliminado correctamente.');

        // this.listTableComponent.reloadTable(true);
      }
    })
  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(FormComponent, {
      autoFocus: false,
      width: '500px',
      data
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      // this.listTableComponent.reloadTable(res.resetPaging);
    });
  }


}
