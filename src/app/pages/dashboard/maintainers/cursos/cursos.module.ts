import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { DropzoneModule } from '@components/dropzone/dropzone.module';
// import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    DropzoneModule
  ]
})
export class CursosModule { }
