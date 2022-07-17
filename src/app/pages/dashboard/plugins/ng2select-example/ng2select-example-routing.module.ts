import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ng2selectExampleComponent } from './ng2select-example.component';

const routes: Routes = [
  {
    path: '',
    component: Ng2selectExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ng2selectExampleRoutingModule { }
