import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'datatables',
    pathMatch: 'full',
  },
  {
    path: 'datatables',
    loadChildren: (): any => import('./datatables/datatables.module').then(m => m.DatatablesModule)
  },
  {
    path: 'dropzone-wrapper',
    loadChildren: (): any => import('./dropzone-example/dropzone-example.module').then(m => m.DropzoneExampleModule)
  },
  {
    path: 'ng2-select',
    loadChildren: (): any => import('./ng2select-example/ng2select-example.module').then(m => m.Ng2selectExampleModule)
  },
  {
    path: 'ng-autocomplete',
    loadChildren: (): any => import('./ng-autocomplete/ng-autocomplete.module').then(m => m.NgAutocompleteModule)
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
