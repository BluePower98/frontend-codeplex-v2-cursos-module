import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DatatablesResponsiveUtils as dtrUtils } from '@utils/datatables/datatables-responsive.util';
import { DatatablesUtils as dtUtils } from '@utils/datatables/datatables.util';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '@interfaces/datatables/datatables.interface';


@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('dtRowActions', { read: TemplateRef, static: true }) dtRowActions: TemplateRef<any>;
  @Output() editForm = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  dtOptions: ADTSettings = {};
  dtInstance: DataTables.Api;

  constructor(
    private http: HttpClient,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const self = this;
      this.dtOptions = {
        initComplete: (settings: DataTables.SettingsLegacy, json: any): void => {

        },
        searching: false,
        pagingType: 'simple_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        responsive: {
          details: {
              renderer: dtrUtils.rendererWithTemplateRef(this.vcr, this.dtRowActions)
          }
        },
        ajax: (dataTablesParameters: any, callback): void => {
          self.http
            .post<DataTablesResponse>(
              'https://angular-datatables-demo-server.herokuapp.com/',
              dataTablesParameters, {}
            ).subscribe((resp: any) => {
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data
              });
            });
        },
        columns: [
          {
            title: 'ID',
            data: 'id',
            className: 'dt-body-center'
          },
          {
            title: 'FirstName',
            data: 'firstName'
          },
          {
            title: 'LastName',
            data: 'lastName'
          },
          {
            title: 'Actions',
            data: null,
            defaultContent: '',
            className: 'dt-container-actions',
          }
        ],
        rowCallback: dtUtils.rowCallbackWithTemplateRef(this.vcr, this.dtRowActions)
      };
  }

  async ngAfterViewInit(): Promise<void> {
    this.dtInstance = await this.dtElement.dtInstance;
  }

  onEdit(data: any): void {
    this.editForm.emit(data);
  }

  onDelete(data: any): void {
    this.delete.emit(data);
  }

  reloadTable(resetPaging: boolean): void {
    this.dtInstance.ajax.reload(((json: any) => {
      console.log('reload', json);
    }), resetPaging);
  }

}
