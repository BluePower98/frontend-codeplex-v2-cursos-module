import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesRoutingModule } from './especialidades-routing.module';
//import { EspecialidadesListComponent } from './components/especialidades-list/especialidades-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DataTablesModule } from 'angular-datatables';
import { EspecialidadesListComponent } from './components/especialidades-list/especialidades-list.component';
import { EspecialidadesComponent } from './especialidades.component';
import { ModalEspecialidadesComponent } from './components/modal-especialidades/modal-especialidades.component';

@NgModule({
  declarations: [
    EspecialidadesComponent,
    EspecialidadesListComponent,
    ModalEspecialidadesComponent
    
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule
  ]
})
export class EspecialidadesModule { }
