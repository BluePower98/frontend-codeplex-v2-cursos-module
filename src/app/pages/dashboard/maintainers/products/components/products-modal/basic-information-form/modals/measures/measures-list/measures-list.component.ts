import { Component, Input, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { PageEvent } from '@angular/material/paginator';
import { MeasureService } from '@services/api/measure/measure.service';
import { HttpStatusCode } from '@angular/common/http';

const PAGINATOR_CONFIG = {
  perPage: 5,
  page: 1,
  length: [5, 20, 30, 50],
}


@Component({
  selector: 'app-measures-list',
  templateUrl: './measures-list.component.html',
  styleUrls: ['./measures-list.component.scss']
})
export class MeasuresListComponent implements OnInit {


  @Input() data: any;
  errorMatcher = new MyErrorStateMatcher();  
  form: FormGroup;
  cellEditRow: number = -1;
  newItemAdded: boolean = false;

  measures: any[] = [];
  measuresCodes: any[] = [];
  filters: any = {
    descripcion: '',
    sunatcodigo: ''
  };
  paginationConfig: any = {...PAGINATOR_CONFIG};
  refreshData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private measureService: MeasureService,
    private sweetAlertService: SweetAlertService,
    private toastNotificationService: ToastNotificationService,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

    this.fetchMeasures();
    this.fetchMeasureCodes();
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

  onChangeMeasureCode($event: any): void {
    this.f.sunatcodigo.patchValue($event || '');
  }

  addMeasure(): void {
    if (!this.newItemAdded) {
      this.form.reset();
      this.cellEditRow = 0;
      this.measures.unshift({ ...this.buildForm().value, show: true });
      this.form.patchValue(this.measures[0]);
    }
    this.newItemAdded = true;
  }

  cancelMeasure(index: number): void {
    this.form.reset();
    this.cellEditRow = -1

    if (this.newItemAdded && index == 0) {
      this.measures.splice(index, 1);
      this.newItemAdded = false;
    }
  }

  addOrEdit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const action = this.newItemAdded ? 'M01' : 'M02';

    this.measureService.CreateUpdateMedidas(this.form.value, action)
      .subscribe(
        (res: any) => {
          const { status, mensaje: message } = res;

          if ([200, 201].includes(status)) {
            this.refreshData = true;
            this.fetchMeasures();
            this.toastNotificationService.success(message);
          } else {
            this.toastNotificationService.error(message);
          }
        },
        (err: any) => this.toastNotificationService.error(err.mensaje)
      )    
  }

  editMeasure(item: any, index: number): void {
    this.cellEditRow = index;
    
    if (this.newItemAdded) {
      this.cancelMeasure(0);
      this.newItemAdded = false;
    }

    const { idempresa, idmedida } = item;

    this.measureService.GetMedidasId(idempresa, idmedida)
      .subscribe(res => this.form.patchValue(res[0]));
  }

  deleteMeasure(item: any, index: number): void {
    this.sweetAlertService.confirm(
      '¿Estás seguro que quieres eliminar la medida seleccionada?',
      { title: 'Eliminar medida'}
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const { idempresa, idmedida } = item;

        this.measureService.DeleteMedidas(idempresa, idmedida)
          .subscribe((res: any) => {
            const { status, mensaje: message } = res;

            if (status === HttpStatusCode.Ok) {
              this.refreshData = true;
              this.measures.splice(index, 1);
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


  private fetchMeasures(): void {
    this.measureService.GetMedidas(this.data.companyId)
      .subscribe((res: any[]) => {
        this.measures = res;
        this.cellEditRow = -1;
        this.newItemAdded = false;
      });
  }


  private fetchMeasureCodes() {
    this.measureService.getCodigoMedidas()
      .subscribe((res: any[]) => {
        this.measuresCodes = res;
      });
  }


  private buildForm(): FormGroup {
    const { companyId } = this.data;

    const form = this.fb.group({
      idempresa: companyId,
      idmedida: [null],
      descripcion: ['', Validators.required],
      sunatcodigo: [''],
      equivalencia: [1]
    });

    return form;
  }

}
