import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BasicInformationFormComponent } from './basic-information-form/basic-information-form.component';

@Component({
  selector: 'app-products-modal-form',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {
  @ViewChild(BasicInformationFormComponent, {static: true}) productsFormComponent: BasicInformationFormComponent;

  companyId: string;
  ruc: string;
  selectedTabIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('idempresa');
    this.ruc = sessionStorage.getItem('ruc');
  }

  onSelectedTabChange($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }

}
