import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '@services/api/product/product.service';
import { ExcelService } from '@services/excel.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss']
})
export class ProductsFiltersComponent implements OnInit, OnDestroy {

  @Output() onChangeFilter = new EventEmitter<any>();

  form: FormGroup;
  productTypeList$: Observable<Array<any>>;
  productTypeList: Array<any> = [];

  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchProductTypesData();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onChangeProductType($event: any): void {
    this.onChangeFilter.emit($event.Id);
  }

  exportData(): void {
    const { companyId, productTypeId } = this.form.value;

    this.productService.exportDataProducts(companyId, productTypeId)
      .subscribe(data => {
        this.excelService.exportAsExcelFile(data, 'Productos');
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      productTypeId: [1],
    })
  }

  private fetchProductTypesData(): void {

    this.productService.getComboTipoproductos()
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(res => this.productTypeList = res);
  }

}
