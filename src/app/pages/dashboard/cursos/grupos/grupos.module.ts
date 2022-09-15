import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { ComponentsListComponent } from './components/components-list/components-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DataTablesModule } from 'angular-datatables';
import { GruposModalComponent } from './components/grupos-modal/grupos-modal.component';


@NgModule({
  declarations: [
    GruposComponent,
    ComponentsListComponent,
    GruposModalComponent
  ],
  imports: [
    CommonModule,
    GruposRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule
  ]
})
export class GruposModule { }
