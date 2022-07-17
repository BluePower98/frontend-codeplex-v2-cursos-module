import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropzoneExampleComponent } from './dropzone-example.component';

const routes: Routes = [
  {
    path: '',
    component: DropzoneExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropzoneExampleRoutingModule { }
