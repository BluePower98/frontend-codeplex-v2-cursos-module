import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructoresRoutingModule } from './instructores-routing.module';
import { InstructoresComponent } from './instructores.component';
import { InstructoresListComponent } from './components/instructores-list/instructores-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DataTablesModule } from 'angular-datatables';
import { InstructoresModalComponent } from './components/instructores-modal/instructores-modal.component';
import { DropzoneModule } from '@components/dropzone/dropzone.module';

@NgModule({
  declarations: [
    InstructoresComponent,
    InstructoresListComponent,
    InstructoresModalComponent
  ],
  imports: [
    CommonModule,
    InstructoresRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule,
    DropzoneModule
  ]
})
export class InstructoresModule { }
