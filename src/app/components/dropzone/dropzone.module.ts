import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneModalPreviewComponent } from './dropzone-modal-preview/dropzone-modal-preview.component';
import { DropzoneUploadComponent } from './dropzone-upload/dropzone-upload.component';
import {
  DropzoneModule as DropzoneModulePlugin,
  DropzoneConfigInterface,
  DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

import { DropzoneUtils } from '@utils/dropzone.util';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { PipesModule } from '@pipes/pipes.module';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
  declarations: [
    DropzoneModalPreviewComponent,
    DropzoneUploadComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    DropzoneModulePlugin,
    MatButtonModule,
    SharedComponentsModule,
    PipesModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    DropzoneUtils
  ],
  exports: [
    DropzoneModalPreviewComponent,
    DropzoneUploadComponent,
  ]
})
export class DropzoneModule { }
