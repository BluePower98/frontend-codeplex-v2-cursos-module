import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesRoutingModule } from './datatables-routing.module';
import { DatatablesComponent } from './datatables.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/shared/shared.module';

import { DataTablesModule as AngularDataTablesModule} from 'angular-datatables';
import { FormComponent } from './components/form/form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ListTableColumnFilterComponent } from './list-table-column-filter/list-table-column-filter.component';


@NgModule({
  declarations: [
    DatatablesComponent,
    FormComponent,
    ListTableComponent,
    ListTableColumnFilterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularDataTablesModule,
    DatatablesRoutingModule
  ],
  providers: []
})
export class DatatablesModule { }
