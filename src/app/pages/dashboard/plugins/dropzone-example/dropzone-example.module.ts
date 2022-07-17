import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { DropzoneExampleRoutingModule } from './dropzone-example-routing.module';
import { DropzoneExampleComponent } from './dropzone-example.component';
import { DropzoneUtils } from '@utils/dropzone.util';
import { FileUtils } from '@utils/file.util';
import { PipesModule } from '@pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from '@components/shared/shared-components.module';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*, application/pdf',
  createImageThumbnails: true
};

@NgModule({
  declarations: [
    DropzoneExampleComponent
  ],
  imports: [
    CommonModule,
    DropzoneExampleRoutingModule,
    DropzoneModule,
    MatButtonModule,
    MatIconModule,
    SharedComponentsModule,
    PipesModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    DropzoneUtils,
    FileUtils
  ]
})
export class DropzoneExampleModule { }
