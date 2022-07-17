import { Component, EventEmitter, OnInit, Output, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { BarcodeScannerLivestreamOverlayComponent } from 'ngx-barcode-scanner';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { SweetAlertService } from '@services/ui/sweet-alert.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit {

  @ViewChild(BarcodeScannerLivestreamOverlayComponent) barecodeScannerOverlay: BarcodeScannerLivestreamOverlayComponent;
  @Output() onCaptureValue: EventEmitter<any> = new EventEmitter<any>();

  private scannerSound = new Audio('assets/audio/barcode.wav');

  constructor(
    private deviceService: DeviceDetectorService,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit(): void {
  }

  start(): void {
    const deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();

    if (
      this.deviceService.isMobile() &&
      (deviceInfo.os).toLowerCase() === 'ios' &&
      (deviceInfo.browser).toLowerCase() !== 'safari'
    ) {
      this.sweetAlertService.warning('Para poder usar el scanner desde su dispositivo Iphone, debe usar el navegador Safari.');
      
      return;
    }

    this.barecodeScannerOverlay.scanner.start().then(() => {
      this.barecodeScannerOverlay.show();
    })
    .catch((err: DOMException) => {
      if (err.name === 'NotFoundError') {
        this.sweetAlertService.error('Para poder usar el scanner debe activar la cámara de su dispositivo');
      } else {
        this.sweetAlertService.error('Ocurrió un problema inesperado al iniciar el scanner.');
      }
    });
  }

  onValueChanges(result: any): void {
    if (result.codeResult.code) {
      
      this.scannerSound.play();
      this.barecodeScannerOverlay.scanner.stop();
      this.barecodeScannerOverlay.hide();

      this.onCaptureValue.emit(result.codeResult.code);
    }
  }

}
