import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SearchTypeDatatable } from '@constants/datatables/datatables.constant';
import { DataTablesColumnsSearchType } from '@interfaces/datatables/datatables.interface';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesUtils as dtUtils } from '@utils/datatables/datatables.util';
import { DatatablesResponsiveUtils as dtrUtils } from '@utils/datatables/datatables-responsive.util';
import { CursoService } from '@services/api/curso/curso.service';

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.scss']
})
export class ComponentsListComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('dtHeaderButtons', { read: TemplateRef, static: true }) dtHeaderButtons: TemplateRef<any>;
  @ViewChild('dtRowActions', { read: TemplateRef, static: true }) dtRowActions: TemplateRef<any>;
  @ViewChild('dtHeaderFilters', { read: TemplateRef, static: true }) dtHeaderFilters: TemplateRef<any>;
  @Output() editForm = new EventEmitter<any>();
  @Output() addForm = new EventEmitter<void>();
  @Output() delete = new EventEmitter<any>();

  dtOptions: DataTables.Settings = {};
  dtInstance: DataTables.Api;
  companyId: string;
  productTypeId: number;
  visibleOrHiddenColumns: any[] = [];
  searchDebouncerTimerId: any;
  columnsSearchType: DataTablesColumnsSearchType = {
    codigo: SearchTypeDatatable.startWith
  }
  firstLoadDT: boolean = false;
  
  constructor(
    private vcr: ViewContainerRef,
    private CursoService: CursoService
  ) { 
    
  }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.productTypeId = 1;

    this.settingDatatables();
  }

  async ngAfterViewInit(): Promise<void> {
    this.dtInstance = await this.dtElement.dtInstance;

    this.dtInstance.on('responsive-resize', (e: any, dt: any, columns: any) => {
      this.visibleOrHiddenColumns = columns;

      dtUtils.eventHideSearchInputs(columns, e.currentTarget);
    });
  }

  onChangeProductType(value: number): void {
    this.productTypeId = value;
    this.reloadTable(true);
  }

  
  onInputChangedFilter(value: any, columnIndex: number, searchType: SearchTypeDatatable = SearchTypeDatatable.contain): void {
    if (searchType === SearchTypeDatatable.startWith) {
      value = value + "%";
    }

    clearTimeout(this.searchDebouncerTimerId);

    const timer = value?.length > 0 ? 500 : 0;

    this.searchDebouncerTimerId = setTimeout(() => {
      this.dtInstance.column(columnIndex)
        .search(value)
        .draw();
    }, timer);
  }

  add() {
    console.log("click1");
    this.addForm.emit();

  };

  onEdit(data: any): void {
    // console.log(data);
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

  private settingDatatables(): void {
    this.dtOptions = {
      initComplete: (settings: DataTables.SettingsLegacy, json: any): void => {
        const table = settings.nTable as HTMLElement;
        const $thead = this.dtElement['el'].nativeElement.children[0];
        const $dataTablesFilter = document.querySelector('.dataTables_filter');

        $thead.append(this.vcr.createEmbeddedView(this.dtHeaderFilters).rootNodes[0]);
        $dataTablesFilter.append(this.vcr.createEmbeddedView(this.dtHeaderButtons).rootNodes[0]);

        setTimeout(() => {
          dtUtils.eventHideSearchInputs(this.visibleOrHiddenColumns, table);
        }, 0);
      },
      dom: dtUtils.DOM.default,
      lengthMenu: dtUtils.LENGTH_MENU,
      order: [[0, 'desc']],
      pageLength: dtUtils.PAGE_LENGTH_DEFAULT,
      language: dtUtils.LANGUAGE,
      searching: true,
      pagingType: 'simple_numbers',
      serverSide: true,
      processing: true,
      responsive: {
        details: {
          renderer: dtrUtils.rendererWithTemplateRef(this.vcr, this.dtRowActions)
        },
      },
      ajax: (datatablesParameters: any, callback): void => {

        const queryParams = {
          idempresa: this.companyId,
          idtipoproducto: this.productTypeId
        }

        this.CursoService.getDatatablesCursos(datatablesParameters, queryParams)
          .subscribe(data => callback(data));
      },
      columnDefs: [
        { responsivePriority: 2, targets: 1 },
        { responsivePriority: 1, targets: 2 },
      ],
      columns: [
        {
          title: 'Curso ID',
          data: 'idempresa',
          visible: false,
        },
        {
          title: 'Especialidad',
          data: 'descripcionespecialidad',
          name: 'z.descripcion',
          className: 'dt-row-ellipsis'
        },
        {
          title: 'Descripcion',
          data: 'descripcion',
          name: 'T1.descripcion',
          className: 'dt-row-ellipsis'
        },
        {
          title: 'Activo',
          data: 'activo',
          className: 'dt-body-center',
          orderable: false,
          searchable: false,
          render: (data: any) => {
            
            const attrChecked: string = data === 1 ? 'checked' : '';

            return `<input type="checkbox" ${attrChecked} enable />`;
            
          }
        },
        {
          title: 'Acciones',
          data: null,
          defaultContent: '',
          orderable: false,
          searchable: false,
          className: 'dt-container-actions'
        }
      ],
      rowCallback: dtUtils.rowCallbackWithTemplateRef(this.vcr, this.dtRowActions)
    };
  }

}
