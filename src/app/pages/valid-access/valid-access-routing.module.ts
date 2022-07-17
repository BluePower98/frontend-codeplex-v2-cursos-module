import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidAccessComponent } from './valid-access.component';

const routes: Routes = [
  {
    path: '',
    component: ValidAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidAccessRoutingModule { }
