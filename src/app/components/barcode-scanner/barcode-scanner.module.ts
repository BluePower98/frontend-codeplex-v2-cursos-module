import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeScannerLivestreamModule, BarcodeScannerLivestreamOverlayModule } from 'ngx-barcode-scanner';
import { BarcodeScannerComponent } from './barcode-scanner.component';



@NgModule({
  declarations: [
    BarcodeScannerComponent
  ],
  imports: [
    CommonModule,
    BarcodeScannerLivestreamModule,
    BarcodeScannerLivestreamOverlayModule,
  ],
  exports: [
    BarcodeScannerComponent
  ]
})
export class BarcodeScannerModule { }
