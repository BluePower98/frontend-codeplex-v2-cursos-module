import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SweetAlertService } from '@services/ui/sweet-alert.service';

@Component({
  selector: 'app-import-selling-prices-form',
  templateUrl: './import-selling-prices-form.component.html',
  styleUrls: ['./import-selling-prices-form.component.scss']
})
export class ImportSellingPricesFormComponent implements OnInit {

  @ViewChild('inputFile', { static: false, read: ElementRef }) inputFile: ElementRef;
  @Output() onUploadFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() onUploadData: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDownloadTemplateExcel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteImportedProducts: EventEmitter<any> = new EventEmitter<any>();
  @Input() companyId: string;
  @Input() productTypes: Array<any> = [];
  @Input() zones: Array<any> = [];
  @Input() showUploadDataButton: boolean;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const productTypes: Array<any> = changes?.productTypes?.currentValue || [];
    const zones: Array<any> = changes?.zones?.currentValue || [];

    if (productTypes.length > 0) {
      this.onChangeProductType(productTypes[0]);
    } 

    if (zones.length > 0) {
      this.onChangeZone(zones[0]);
    } 
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  onChangeProductType($event: any): void {
    this.f.idtipoproducto.patchValue($event?.Id || '');
  }

  onChangeZone($event: any): void {
    this.f.id_zona.patchValue($event?.Id || '');
  }

  uploadFile($event: any): void {
    this.onUploadFile.emit($event.target.files[0]);
  }

  uploadData(): void {
    this.onUploadData.emit(this.form.value);
  }

  downloadTemplateExcel(fileName: string) {
    this.onDownloadTemplateExcel.emit(fileName);
  }

  deleteImportedProducts(): void {
    this.sweetAlertService.confirm(
      'Estás seguro que quieres eliminar los productos importados?',
      { title: 'Eliminar productos importados' }
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.onDeleteImportedProducts.emit(this.form.value);
      }
    })
  }

  resetInputFile(): void {
    this.inputFile.nativeElement.value = null;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      idempresa: this.companyId,
      idtipoproducto: ['', Validators.required],
      id_zona: ['', Validators.required]
    });
  }

}
