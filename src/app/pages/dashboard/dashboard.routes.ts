import { Routes } from '@angular/router';
import { CURSOS_ROUTES } from './cursos/cursos.routes';
import { MAINTAINERS_ROUTES } from './maintainers/maintainers.routes';

export const DASHBOARD_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: (): any => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
      data: {
        preload: true
      }
    },
    {
      path: 'example',
      loadChildren: (): any => import('./example/example.module').then(m => m.ExampleModule)
    },
    {
      path: 'forms',
      loadChildren: (): any => import('./forms/fields/fields.module').then(m => m.FormsFieldsModule)
    },
    {
      path: 'plugins',
      loadChildren: (): any => import('./plugins/plugins.module').then(m => m.PluginsModule)
    },
    {
      path: 'Logistica.Net/Mantenedores',
      children: MAINTAINERS_ROUTES
    },
    {
      path: 'Cursos/Mantenedores',
      children:CURSOS_ROUTES
    },
  ];