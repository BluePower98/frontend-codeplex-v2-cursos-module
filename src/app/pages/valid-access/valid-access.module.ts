import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { ValidAccessRoutingModule } from './valid-access-routing.module';
import { ValidAccessComponent } from './valid-access.component';


@NgModule({
  declarations: [
    ValidAccessComponent
  ],
  imports: [
    CommonModule,
    ValidAccessRoutingModule,
    MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatProgressSpinnerModule,
      FuseCardModule,
      FuseAlertModule,
      SharedModule
  ]
})
export class ValidAccessModule { }
