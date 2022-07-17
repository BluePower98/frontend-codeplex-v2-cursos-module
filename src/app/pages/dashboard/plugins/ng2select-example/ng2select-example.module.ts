import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2selectExampleRoutingModule } from './ng2select-example-routing.module';
import { Ng2selectExampleComponent } from './ng2select-example.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    Ng2selectExampleComponent
  ],
  imports: [
    CommonModule,
    Ng2selectExampleRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class Ng2selectExampleModule { }
