import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgAutocompleteComponent } from './ng-autocomplete.component';

const routes: Routes = [
  {
    path: '',
    component: NgAutocompleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgAutocompleteRoutingModule { }
