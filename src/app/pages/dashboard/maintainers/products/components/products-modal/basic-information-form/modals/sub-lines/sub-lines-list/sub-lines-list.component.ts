import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MatDialog } from '@angular/material/dialog';

import { LinesComponent } from '../../lines/lines.component';
import { LineService } from '@services/api/line/line.service';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { SubLineService } from '@services/api/sub-line/sub-line.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { HttpStatusCode } from '@angular/common/http';

const PAGINATOR_CONFIG = {
  perPage: 5,
  page: 1,
  length: [5, 20, 30, 50],
}

@Component({
  selector: 'app-sub-lines-list',
  templateUrl: './sub-lines-list.component.html',
  styleUrls: ['./sub-lines-list.component.scss']
})
export class SubLinesListComponent implements OnInit {

  @ViewChild('linesSelect', { static: false }) linesSelect: NgSelectComponent;
  @Input() data: any;
  errorMatcher = new MyErrorStateMatcher();  
  form: FormGroup;
  cellEditRow: number = -1;
  newItemAdded: boolean = false;
  productTypes: any[] = [];
  lines: any[] = [];
  subLines: any[] = [];
  filters: any = {
    codigo: '',
    Deslineas: '',
    descripcion: '',
    Destipoproductos: ''
  };

  paginationConfig: any = {...PAGINATOR_CONFIG};
  refreshData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private lineService: LineService,
    private subLineService: SubLineService,
    private sweetAlertService: SweetAlertService,
    private toastNotificationService: ToastNotificationService,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

    this.fetchSubLines();
    this.fetchProductTypes();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  addSubLine(): void {
    if (!this.newItemAdded) {
      this.form.reset();
      this.subLines.unshift({ ...this.buildForm().value, show: true });
      this.cellEditRow = 0;
      this.form.patchValue(this.subLines[this.cellEditRow]);
    }

    this.fetchProductTypes();
    this.newItemAdded = true;
  }

  cancelSubLine(index: number): void {
    this.form.reset();
    this.cellEditRow = -1

    if (this.newItemAdded && index === 0) {
      this.subLines.splice(index, 1);
      this.newItemAdded = false;
    }
  }

  onClearFilter(field: string): void {
    this.filters[field] = '';
  }

  onChangeFilter($event: any, field: string): void {
    console.log('changeFilter', {$event, field});
    if ($event) {
      this.filters[field] = $event;
    }
  }

  onSelectFilter($event: any, field: string): void {
    this.filters[field] = $event.ItemName;
  }

  onChangeProductType($event: any): void {
    this.f.idtipoproducto.patchValue($event?.Id || '');
    this.fetchLines();
  }

  onChangeLine($event: any): void {
    this.form.get('idlinea').patchValue($event?.Id || '');
  }

  openModalNewLines() {
    this.linesSelect.close();

    const { idtipoproducto } = this.form.value;

    const dialogRef = this.dialog.open(LinesComponent, {
      panelClass: 'custom-modalbox',
      autoFocus: true,
      width: '900px',
      data: {
        companyId: this.data.companyId,
        idtipoproducto: Number(idtipoproducto)
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res?.refreshData) {
        this.fetchLines();
      }

      console.log('openModalNewLines - close', {res});
    });
  }

  editSubLine(item: any, index: number) {
    this.cellEditRow = index;
    
    if (this.newItemAdded) {
      this.cancelSubLine(0);
      this.newItemAdded = false;
    }

    const { idempresa, idtipoproducto, idlinea, idlineasub } = item;

    this.subLineService.GetLineassubId(idempresa, idtipoproducto, idlinea, idlineasub)
      .subscribe(res => {
        this.form.patchValue(res[0]);
        this.fetchProductTypes();
        this.fetchLines();
      });
  }

  addOrEdit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const action = this.newItemAdded ? 'M01' : 'M02';

    this.subLineService.CreateUpdateLineassub(this.form.value, action)
      .subscribe(
        (res: any) => {
          const { status, mensaje: message } = res;

          if ([200, 201].includes(status)) {
            this.refreshData = true;
            this.fetchSubLines();
            this.toastNotificationService.success(message);
          } else {
            this.toastNotificationService.error(message);
          }
        },
        (err: any) => this.toastNotificationService.error(err.mensaje)
      )
  }

  deleteSubLine(item: any, index: number): void {
    this.sweetAlertService.confirm(
      '¿Estás seguro que quieres eliminar la sub-linea seleccionada?',
      { title: 'Eliminar sub-linea' }
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const { idempresa, idtipoproducto, idlinea, idlineasub } = item;

        this.subLineService.DeleteLineassub(idempresa, idtipoproducto, idlinea, idlineasub)
          .subscribe((res: any) => {
            const { status, mensaje: message } = res;

            if (status === HttpStatusCode.Ok) {
              this.refreshData = true;
              this.subLines.splice(index, 1);
              this.toastNotificationService.success(message);
            } else {
              this.toastNotificationService.error(message);
            }
          });
      }
    });
  }

  handlePage(e: PageEvent): void {
    this.paginationConfig.perPage = e.pageSize;
    this.paginationConfig.page = e.pageIndex + 1;
  }

  private fetchSubLines(): void {
    const { companyId, idtipoproducto, idlinea } = this.data;

    this.subLineService.GetLineassub(companyId, idtipoproducto, idlinea)
      .subscribe(res => {
        this.subLines = res
        this.cellEditRow = -1;
        this.newItemAdded = false;
      });
  }

  private fetchProductTypes(): void {
    const { idtipoproducto } = this.data;

    this.lineService.GetComboTipoproductos(idtipoproducto)
      .subscribe(res => {
        this.productTypes = res;

        if (this.newItemAdded == true) {
          this.f.idtipoproducto.patchValue(idtipoproducto);
          this.fetchLines();
        }
      });
  }

  private fetchLines(): void {
    const { companyId, idlinea } = this.data;
    const idtipoproducto = this.f.idtipoproducto.value;

    this.subLineService.GetComboLineas(companyId, idtipoproducto, idlinea)
      .subscribe((res: any[]) => {
        this.lines = res;

        if (res.length === 0) {
          this.f.idlinea.patchValue(null);
          return;
        }

        if (this.newItemAdded) {
          this.f.idlinea.patchValue(idlinea);
        }
      });
  }

  private buildForm(): FormGroup {
    const { companyId } = this.data;

    const form = this.fb.group({
      idempresa: companyId,
      idtipoproducto: ['', Validators.required],
      idlinea: ['', Validators.required],
      idlineasub: [null],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    return form;
  }

}
