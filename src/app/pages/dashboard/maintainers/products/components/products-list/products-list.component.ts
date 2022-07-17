import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesResponsiveUtils as dtrUtils } from '@utils/datatables/datatables-responsive.util';
import { DatatablesUtils as dtUtils } from '@utils/datatables/datatables.util';
import { ProductService } from '@services/api/product/product.service';
import { DataTablesColumnsSearchType } from '@interfaces/datatables/datatables.interface';
import { SearchTypeDatatable } from '@constants/datatables/datatables.constant';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit {

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
    private productService: ProductService
  ) { }

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
    this.addForm.emit();
  };

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

        this.productService.getDatatablesProducts(datatablesParameters, queryParams)
          .subscribe(data => callback(data));
      },
      columnDefs: [
        { responsivePriority: 2, targets: 1 },
        { responsivePriority: 1, targets: 2 },
      ],
      columns: [
        {
          title: 'PRODUCTO ID',
          data: 'idproducto',
          visible: false,
        },
        {
          title: 'Código',
          data: 'codigo',
          name: 'T1.codigo',
          className: 'dt-body-center filter-start-with',
        },
        {
          title: 'Descripción',
          data: 'descripcion',
          name: 'T1.descripcion',
          className: 'dt-row-ellipsis',
          render: dtUtils.renderEllipsisText(40),
        },
        {
          title: 'Linea',
          data: 'Deslineas',
          name: 'T3.descripcion',
          className: 'dt-body-center dt-row-ellipsis',
          render: dtUtils.renderEllipsisText(20)
        },
        {
          title: 'Sub_Lineas',
          data: 'Deslineassub',
          name: 'T4.descripcion',
          className: 'dt-body-center dt-row-ellipsis',
          render: dtUtils.renderEllipsisText(20)
        },
        {
          title: 'Tipo',
          data: 'Destipoproductos',
          name: 'T2.descripcion',
          className: 'dt-body-center',
        },
        {
          title: 'Igv',
          data: 'Dessunatt07',
          name: 'T5.descripcion',
          className: 'dt-body-center dt-row-ellipsis',
          render: dtUtils.renderEllipsisText(15)
        },
        {
          title: 'Activo',
          data: 'activo',
          className: 'dt-body-center',
          orderable: false,
          searchable: false,
          render: (data: any) => {
            const attrChecked: string = data === '1' ? 'checked' : '';

            return `<input type="checkbox" ${attrChecked} disabled />`;
          }
        },
        {
          title: 'Percepción',
          data: 'porpercepcion',
          className: 'dt-body-center',
        },
        {
          title: 'Isc',
          data: 'porisc',
          className: 'dt-body-center',
        },
        {
          title: 'Acciones',
          data: null,
          defaultContent: '',
          className: 'dt-container-actions',
        }
      ],
      rowCallback: dtUtils.rowCallbackWithTemplateRef(this.vcr, this.dtRowActions)
    };
  }
}
