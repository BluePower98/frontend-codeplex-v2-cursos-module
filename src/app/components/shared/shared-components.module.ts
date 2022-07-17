import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/components/material/material.module';
import { PipesModule } from '@pipes/pipes.module';
import { ModalVideoGuidelinesComponent } from './modal-video-guidelines/modal-video-guidelines.component';
import { ModuleButtonVideosComponent } from './module-button-videos/module-button-videos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../forms/input/input.component';
import { LoadingComponent } from './loading/loading.component';

const SHARED_COMPONENTS = [
  ModalVideoGuidelinesComponent,
  ModuleButtonVideosComponent,
  InputComponent,
  LoadingComponent
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    MaterialModule
  ]
})
export class SharedComponentsModule { }
