import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';

import { DataTablesModule } from 'angular-datatables';
import { ComponentModalComponent } from './components/component-modal/component-modal.component';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DropzoneModule } from '@components/dropzone/dropzone.module';





@NgModule({
  declarations: [
    AlumnosComponent,
    ComponentListComponent,
    ComponentModalComponent
    
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule,
    DropzoneModule
    
  ]
})
export class AlumnosModule { }
