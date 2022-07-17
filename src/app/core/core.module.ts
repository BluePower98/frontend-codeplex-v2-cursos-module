import { mockApiServices } from './../mock-api/index';
import { appConfig } from './config/app.config';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsModule } from '@core/icons/icons.module';
import { HttpCancelInterceptor } from './interceptors/http-cancel.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { HttpCancelService } from './services/http-cancel.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';

@NgModule({
    declarations: [
    ],
    imports: [
        IconsModule,
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
    ],
    providers: [
        AuthService,
        AuthGuard,
        HttpCancelService,
        HttpErrorHandlerService,
        {
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
        },
    ]
})
export class CoreModule {
}
