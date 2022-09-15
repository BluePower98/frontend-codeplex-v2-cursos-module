import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComentariosRoutingModule } from './comentarios-routing.module';
import { ComentariosComponent } from './comentarios.component';
import { ComentariosListComponent } from './components/comentarios-list/comentarios-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { DataTablesModule } from 'angular-datatables';
import { ModalComentariosComponent } from './components/modal-comentarios/modal-comentarios.component';

@NgModule({
  declarations: [
    ComentariosComponent,
    ComentariosListComponent,
    ModalComentariosComponent,
    
  ],
  imports: [
    CommonModule,
    ComentariosRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    PipesModule,
    FuseCardModule,
    SharedComponentsModule,
    DataTablesModule
  ]
})
export class ComentariosModule { }
