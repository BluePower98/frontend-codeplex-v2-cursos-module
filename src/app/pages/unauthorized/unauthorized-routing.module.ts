import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

const routes: Route[] = [
  {
    path: '',
    component: UnauthorizedComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UnauthorizedRoutingModule { }
