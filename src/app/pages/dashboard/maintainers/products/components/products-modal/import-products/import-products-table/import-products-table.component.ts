import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import-products-table',
  templateUrl: './import-products-table.component.html',
  styleUrls: ['./import-products-table.component.scss']
})
export class ImportProductsTableComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @Input() displayedColumns: Array<any> = [];
  @Input() set data(values: Array<any>) {
    this.settingDataSource(values);
  }

  dataSource: MatTableDataSource<any>;
  
  constructor() { }

  ngOnInit(): void {}

  private settingDataSource(data: Array<any>): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

}
