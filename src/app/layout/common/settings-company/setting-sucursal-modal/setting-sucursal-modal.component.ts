import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-setting-sucursal-modal',
  templateUrl: './setting-sucursal-modal.component.html',
  styleUrls: ['./setting-sucursal-modal.component.scss']
})
export class SettingSucursalModalComponent implements OnInit {

  sucursales: Array<any> = [];
  selected: any;
  displayedColumns: string[] = ['nombre', 'correo', 'action'];
  dataSource: MatTableDataSource<any>;
  searchValue: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingSucursalModalComponent>,
  ) { }

  ngOnInit(): void {
    const { sucursales, selected } = this.data;

    this.selected = selected;
    this.sucursales = sucursales;
    this.dataSource = new MatTableDataSource(sucursales);
    this.onValuesChangesSearch();
  }

  onChangeSucursal($event: MatRadioChange) {
    const sucursal = this.sucursales.find(({idsucursal}) => idsucursal === $event.value);

    this.dialogRef.close({ selected: sucursal});
  }

  onSelectedSearch(item: any): void {
    this.searchValue.patchValue(item.sucursal);
  }

  onChangeSearch(value: string): void {
    this.searchValue.patchValue(value);
  }

  onClearSearch(): void {
    this.searchValue.patchValue(null);
  }

  private onValuesChangesSearch(): void {
    this.searchValue.valueChanges.subscribe(value => {
      let sucursales = this.sucursales;

      if (value) {
        sucursales = sucursales.filter((sucursal: any) => (sucursal.sucursal as string).includes(value));
      }

      this.dataSource.data = sucursales;
    });
  }

}
