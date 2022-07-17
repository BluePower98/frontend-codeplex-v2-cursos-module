import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgAutocompleteRoutingModule } from './ng-autocomplete-routing.module';
import { NgAutocompleteComponent } from './ng-autocomplete.component';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    NgAutocompleteComponent
  ],
  imports: [
    CommonModule,
    NgAutocompleteRoutingModule,
    AutocompleteLibModule
  ]
})
export class NgAutocompleteModule { }
