import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { ComponentsListComponent } from './components/components-list/components-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DataTablesModule } from 'angular-datatables';
import { CursosModalComponent } from './components/cursos-modal/cursos-modal.component';

@NgModule({
  declarations: [
    CursosComponent,
    ComponentsListComponent,
    CursosModalComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule
  ]
})
export class CursosModule { }
