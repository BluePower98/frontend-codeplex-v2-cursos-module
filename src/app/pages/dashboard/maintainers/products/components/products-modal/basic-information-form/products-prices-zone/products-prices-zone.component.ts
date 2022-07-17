import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { MatDialog } from '@angular/material/dialog';
import { PricesZoneService } from '@services/api/prices-zone/prices-zone.service';
import { MeasuresComponent } from '../modals/measures/measures.component';

@Component({
  selector: 'app-products-prices-zone',
  templateUrl: './products-prices-zone.component.html',
  styleUrls: ['./products-prices-zone.component.scss']
})
export class ProductsPricesZoneComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() index: number;
  @Input() companyId: string;
  @Input() enableAggregate: any;
  @Input() showDeleteButton: boolean;
  @Input() edit: boolean;
  @Output() onRemover = new EventEmitter<number>();
  @Output() onRemoverListAdded = new EventEmitter<number>();
  @Output() onStartBarecodeScanner = new EventEmitter<number>();

  errorMatcher = new MyErrorStateMatcher();
  zones: any[] = [];
  measures: any[] = [];
  pricingTypes: any[] = [];

  constructor(
    private dialog: MatDialog,
    private pricesZoneService: PricesZoneService
  ) { }

  ngOnInit(): void {
    this.fetchZones();
    this.fetchMeasures();
    this.fetchPricingTypes();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  showBarcodeScanner(): void {
    try {
      this.onStartBarecodeScanner.emit(this.index);
    } catch (error) {
      console.log('error', {error});
    }
    
  }

  openModalMeasures(): void {
    const dialogRef = this.dialog.open(MeasuresComponent, {
      autoFocus: true,
      disableClose: false,
      width: '900px',
      data: {
        companyId: this.companyId
      }
    });

    dialogRef.afterClosed().subscribe(res => {
        if (res?.refreshData) {
          this.fetchMeasures();
        }
  
        console.log('openModalMeasures - close', {res});
    });
  }

  onChangeQuantity(type: string): void {
    let value: number = this.f.cantidadMinVen.value;

    if (type === 'increment') {
        value++;
    } else {
        value--;
    }

    this.f.cantidadMinVen.patchValue(value);
  }

  removePrice(): void {
    this.onRemover.next(this.index);
    this.onRemoverListAdded.next(this.index);
  }

  onSelectionChange(field: string, value: any): void {
    this.f[field].patchValue(value);
  }

  private fetchZones(): void {
    this.pricesZoneService.getComboZonas(this.companyId)
        .subscribe((res: any[]) => {
            this.zones = res;

            this.setDefaultValueToSelector(res, 'idzona');
        });
  }

  private fetchMeasures(): void {
    this.pricesZoneService.getComboMedidas(this.companyId)
        .subscribe((res: any[]) => {
            this.measures = res;

            this.setDefaultValueToSelector(res, 'idmedida');
        });
  }

  private fetchPricingTypes(): void {
    this.pricesZoneService.getComboZonasTipoPrecios()
        .subscribe((res: any[]) => {
            this.pricingTypes = res;

            this.setDefaultValueToSelector(res, 'idtipoprecio');
        });
  }

  private setDefaultValueToSelector(data: any[], field: string): void {
    if (data.length > 0 && !this.edit || this.enableAggregate) {
      this.onSelectionChange(field, data[0].Id);
    }
  }

}
