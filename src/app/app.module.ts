import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api'; */
import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* import { HttpCancelInterceptor } from './interceptors/http-cancel.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor'; */
import { LayoutModule } from '@layout/layout.module';
// import { IconsModule } from '@core/icons/icons.module';
import { CoreModule } from '@core/core.module';
//import { EspecialidadesComponent } from './pages/dashboard/cursos/especialidades/especialidades.component';
//import { ComponentsListComponent } from './pages/dashboard/cursos/components/components-list/components-list.component';
//import { CursosComponent } from './pages/dashboard/maintainers/cursos/cursos.component';
//import { AlumnosComponent } from './pages/dashboard/cursos/alumnos/alumnos.component';
//import { CursosComponent } from './pages/dashboard/cursos/cursos/cursos.component';
//import { GruposComponent } from './pages/dashboard/cursos/grupos/grupos.component';
//import { InstructoresComponent } from './pages/dashboard/cursos/instructores/instructores.component';
//import { ComentariosComponent } from './pages/dashboard/cursos/comentarios/comentarios.component';

@NgModule({
    declarations: [
        AppComponent,
        //EspecialidadesComponent,
        //ComponentsListComponent,
        //CursosComponent,
        //AlumnosComponent,
        //CursosComponent,
        //GruposComponent,
        //InstructoresComponent,
        //ComentariosComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        LayoutModule,

        /* // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices), */

        // Core module of your application
        HttpClientModule,
        // IconsModule,
        CoreModule,

        ToastrModule.forRoot(),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        /* {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpCancelInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpHeadersInterceptor,
            multi: true
        }, */
    ]
})
export class AppModule {
}
