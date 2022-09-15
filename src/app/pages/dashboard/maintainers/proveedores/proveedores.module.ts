import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { ProveedoresListComponent } from './components/proveedores-list/proveedores-list.component';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { FuseCardModule } from '@fuse/components/card';
import { PipesModule } from '@pipes/pipes.module';
import { ProveedoresModalComponent } from './components/proveedores-modal/proveedores-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProveedoresComponent,
    ProveedoresListComponent,
    ProveedoresModalComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    DataTablesModule,
    SharedComponentsModule,
    FuseCardModule,
    PipesModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ProveedoresModule { }
