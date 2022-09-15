import { Routes } from '@angular/router';

export const CURSOS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'Cursos',
        pathMatch: 'full',
    },
    {
        path: 'Cursos',
        loadChildren: (): any => import('./cursos/cursos.module').then(m => m.CursosModule)
    },
    {
        path: 'Alumnos',
        loadChildren: (): any => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
    },
    {
        path: 'Grupos',
        loadChildren: (): any => import('./grupos/grupos.module').then(m => m.GruposModule)
    },
    {
        path: 'Instructores',
        loadChildren: (): any => import('./instructores/instructores.module').then(m => m.InstructoresModule)
    },
    {
        path: 'Comentarios',
        loadChildren: (): any => import('./comentarios/comentarios.module').then(m => m.ComentariosModule)
    },
    {
        path: 'Especialidades',
        loadChildren: (): any => import('./especialidades/especialidades.module').then(m => m.EspecialidadesModule)
    },

];