import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsResolver } from './analytics.resolvers';

const routes: Routes = [
  {
      path: '',
      component: AnalyticsComponent,
      resolve: {
        data: AnalyticsResolver
      }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalyticsRoutingModule { }
