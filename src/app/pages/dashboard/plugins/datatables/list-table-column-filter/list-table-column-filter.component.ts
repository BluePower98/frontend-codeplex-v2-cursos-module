import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { DataTablesResponse } from '@interfaces/datatables/datatables.interface';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DatatablesResponsiveUtils as dtrUtils } from '@utils/datatables/datatables-responsive.util';
import { DatatablesUtils as dtUtils } from '@utils/datatables/datatables.util';

@Component({
  selector: 'app-list-table-column-filter',
  templateUrl: './list-table-column-filter.component.html',
  styleUrls: ['./list-table-column-filter.component.scss']
})
export class ListTableColumnFilterComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('dtActions', { read: TemplateRef, static: true }) dtActions: TemplateRef<any>;
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
        searching: true,
        pagingType: 'simple_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        responsive: {
          details: {
              renderer: dtrUtils.rendererWithTemplateRef(this.vcr, this.dtActions)
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
        rowCallback: dtUtils.rowCallbackWithTemplateRef(this.vcr, this.dtActions)
      };
  }

  async ngAfterViewInit(): Promise<void> {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtInstance = dtInstance;

      dtInstance.columns().every(function() {
        const that = this;
        $('input', this.footer()).on('keyup change', function() {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
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
