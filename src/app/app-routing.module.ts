import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from '@layout/layout.component';
import { DASHBOARD_ROUTES } from './pages/dashboard/dashboard.routes';
import { DashboardDataResolver } from './pages/dashboard/dashboard-data.resolver';
import { ValidAccessResolver } from './pages/valid-access/valid-access.resolver';
import { OnDemandPreloadStrategy } from '@fuse/services/preloading-strategies/on-demand-preload-strategy.service';

const routes: Routes = [
  /* {
    path: '',
    pathMatch: 'full',
    redirectTo: 'valid-access'
  }, */

  // Auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'valid-access/:plan_id/:token',
        loadChildren: (): any => import('./pages/valid-access/valid-access.module').then(m => m.ValidAccessModule),
        resolve: {
          validAccess: ValidAccessResolver
        }
      },
      {
        path: 'unauthorized',
        loadChildren: (): any => import('./pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedtModule)
      },
    ]
  },

  // Admin routes
  {
    path: 'dashboard',
    component: LayoutComponent,
    resolve: {
      initialData: DashboardDataResolver,
    },
    canLoad: [AuthGuard],
    children: DASHBOARD_ROUTES
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: OnDemandPreloadStrategy,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
