import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { LineService } from '@services/api/line/line.service';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';

const PAGINATOR_CONFIG = {
  perPage: 5,
  page: 1,
  length: [5, 20, 30, 50],
}

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss']
})
export class LinesListComponent implements OnInit {

  @Input() data: any;
  errorMatcher = new MyErrorStateMatcher();  
  form: FormGroup;
  cellEditRow: number = -1;
  newItemAdded: boolean = false;
  productTypes: any[] = [];
  lines: any[] = [];
  filters: any = {
    codigo: '',
    descripcion: '',
    Destipoproductos: ''
  };

  paginationConfig: any = {...PAGINATOR_CONFIG};
  refreshData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private lineService: LineService,
    private sweetAlertService: SweetAlertService,
    private toastNotificationService: ToastNotificationService,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.fetchLines();
    this.fetchProductTypes();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
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
  }

  addLine(): void {
    if (!this.newItemAdded) {
      this.form.reset();
      this.cellEditRow = 0;
      this.lines.unshift({ ...this.buildForm().value, show: true });
      this.form.patchValue(this.lines[this.cellEditRow]);
    }

    this.fetchProductTypes();
    this.newItemAdded = true;

    const { idtipoproducto } = this.data;

    this.f.idtipoproducto.patchValue(idtipoproducto);
  }

  cancelLine(index: number): void {
    this.form.reset();
    this.cellEditRow = -1

    if (this.newItemAdded && index === 0) {
      this.lines.splice(index, 1);
      this.newItemAdded = false;
    }
  }


  addOrEdit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const action = this.newItemAdded ? 'M01' : 'M02';

    this.lineService.CreateUpdateLineas(this.form.value, action)
      .subscribe(
        (res: any) => {
          const { status, mensaje: message } = res;

          if ([200, 201].includes(status)) {
            this.refreshData = true;
            this.fetchLines();
            this.toastNotificationService.success(message);
          } else {
            this.toastNotificationService.error(message);
          }
        },
        (err: any) => this.toastNotificationService.error(err.mensaje)
      );
  }

  editLine(item: any, index: number): void {
    this.cellEditRow = index;

    if (this.newItemAdded) {
        this.cancelLine(0);
        this.newItemAdded = false;
    }

    const { idempresa, idtipoproducto, idlinea } = item;

    this.lineService.GetLineasId(idempresa, idtipoproducto, idlinea)
      .subscribe(data => this.form.patchValue(data[0]));
  }

  deleteLine(item: any, index: number): void {
    this.sweetAlertService.confirm(
      '¿Estás seguro que quieres eliminar la linea seleccionada?',
      {
        title: 'Eliminar linea'
      }
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const { idempresa, idtipoproducto, idlinea } = item;

        this.lineService.DeleteLineas(idempresa, idtipoproducto, idlinea)
          .subscribe((res: any) => {
            const { status, mensaje: message } = res;

            if (status === 200) {
              this.refreshData = true;
              this.lines.splice(index, 1);
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

  private fetchLines(): void {
    const { companyId, idtipoproducto } = this.data;

    this.lineService.GetLineas(companyId, idtipoproducto)
      .subscribe(res => {
        this.lines = res;
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
        }
      });
  }

  private buildForm(): FormGroup {
    const { companyId } = this.data;

    const form = this.fb.group({
      idempresa: companyId,
      idtipoproducto: [0, Validators.required],
      idlinea: [null],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    return form;
  }

}
