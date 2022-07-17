import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-setting-company-modal',
  templateUrl: './setting-company-modal.component.html',
  styleUrls: ['./setting-company-modal.component.scss']
})
export class SettingCompanyModalComponent implements OnInit {

  companies: Array<any> = [];
  selected: any;

  displayedColumns: string[] = ['nombre', 'ruc', 'action'];
  dataSource: MatTableDataSource<any>;
  searchValue: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingCompanyModalComponent>,
  ) { }

  ngOnInit(): void {
    const { companies, selected } = this.data;

    this.selected = selected;
    this.companies = companies;
    this.dataSource = new MatTableDataSource(companies);

    this.onValuesChangesSearch();
  }

  onChangeCompany($event: MatRadioChange) {
    const company = this.companies.find(({idempresa}) => idempresa === $event.value);

    this.dialogRef.close({ selected: company});
  }

  onSelectedSearch(item: any): void {
    this.searchValue.patchValue(item.nombrerazon);
  }

  onChangeSearch(value: string): void {
    this.searchValue.patchValue(value);
  }

  onClearSearch(): void {
    this.searchValue.patchValue(null);
  }

  private onValuesChangesSearch(): void {
    this.searchValue.valueChanges.subscribe(value => {
      let companies = this.companies;

      if (value) {
        companies = companies.filter((company: any) => (company.nombrerazon as string).includes(value));
      }

      this.dataSource.data = companies;
    });
  }
}
