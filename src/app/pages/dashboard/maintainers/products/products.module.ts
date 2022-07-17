import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FuseCardModule } from '@fuse/components/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PipesModule } from '@pipes/pipes.module';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedComponentsModule } from '@components/shared/shared-components.module';

import { BasicInformationFormComponent } from './components/products-modal/basic-information-form/basic-information-form.component';
import { ImportProductsComponent } from './components/products-modal/import-products/import-products.component';
import { ImportSellingPricesComponent } from './components/products-modal/import-selling-prices/import-selling-prices.component';
import { KardexComponent } from './components/products-modal/kardex/kardex.component';
import { LinesComponent } from './components/products-modal/basic-information-form/modals/lines/lines.component';
import { LinesListComponent } from './components/products-modal/basic-information-form/modals/lines/lines-list/lines-list.component';
import { MeasuresComponent } from './components/products-modal/basic-information-form/modals/measures/measures.component';
import { MeasuresListComponent } from './components/products-modal/basic-information-form/modals/measures/measures-list/measures-list.component';
import { ProductsComponent } from './products.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsModalComponent } from './components/products-modal/products-modal.component';
import { ProductsPricesZoneComponent } from './components/products-modal/basic-information-form/products-prices-zone/products-prices-zone.component';
import { SubLinesComponent } from './components/products-modal/basic-information-form/modals/sub-lines/sub-lines.component';
import { SubLinesListComponent } from './components/products-modal/basic-information-form/modals/sub-lines/sub-lines-list/sub-lines-list.component';
import { ImportProductsFormComponent } from './components/products-modal/import-products/import-products-form/import-products-form.component';
import { ImportProductsTableComponent } from './components/products-modal/import-products/import-products-table/import-products-table.component';
import { ImportSellingPricesFormComponent } from './components/products-modal/import-selling-prices/import-selling-prices-form/import-selling-prices-form.component';
import { ImportSellingPricesTableComponent } from './components/products-modal/import-selling-prices/import-selling-prices-table/import-selling-prices-table.component';
import { DropzoneModule } from '@components/dropzone/dropzone.module';
import { BarcodeScannerModule } from '@components/barcode-scanner/barcode-scanner.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    BasicInformationFormComponent,
    ProductsModalComponent,
    ProductsPricesZoneComponent,
    ProductsFiltersComponent,
    LinesComponent,
    SubLinesComponent,
    LinesListComponent,
    SubLinesListComponent,
    MeasuresComponent,
    MeasuresListComponent,
    ImportProductsComponent,
    ImportSellingPricesComponent,
    KardexComponent,
    ImportProductsFormComponent,
    ImportProductsTableComponent,
    ImportSellingPricesFormComponent,
    ImportSellingPricesTableComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedComponentsModule,
    DropzoneModule,
    BarcodeScannerModule,
    ReactiveFormsModule,
    FuseCardModule,
    DataTablesModule,
    NgSelectModule,
    PipesModule,
    AutocompleteLibModule
  ],
  entryComponents: [
    ProductsModalComponent,
    LinesComponent,
    SubLinesComponent
  ],
  providers: [],
  exports: [
    ImportProductsFormComponent,
    ImportProductsTableComponent
  ]
})
export class ProductsModule { }
