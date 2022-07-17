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

@NgModule({
    declarations: [
        AppComponent,
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
