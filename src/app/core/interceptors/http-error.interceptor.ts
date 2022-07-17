import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpErrorResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { AuthService } from '@core/services/auth/auth.service';
import { ErrorHandler, HttpErrorHandlerService } from '@core/services/http-error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService,
        private httpErrorHandlerService: HttpErrorHandlerService,
        private sweetAlertService: SweetAlertService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (this.httpErrorHandlerService.isAutomatic()) {
                    this.displayAlertError(err);
                }

                return throwError(err);
            })
        );
    }

    private displayAlertError(err: HttpErrorResponse): void {
        const { error, status, message } = err;
    
        this.httpErrorHandlerService.setHandler(ErrorHandler.automatic);
    
        if (err.status === 0) {
          this.sweetAlertService.error(message);
          return;
        }
    
        if (status === HttpStatusCode.Unauthorized) {
          this.displayUnauthorizedError(error);
          return;
        }
    
        if (status === HttpStatusCode.UnprocessableEntity) {
            this.displayValidationErrors(error);
            return;
        }
    
        this.sweetAlertService.error(error?.message || message);
    }
    
    private displayUnauthorizedError(error: any): void {
        const { message } = error;

        if (
            !this.authService.isAuthenticated() || 
            ['/login'].includes(this.router.url)
        ) {
            this.sweetAlertService.error(message);
            return;
        }

        this.sweetAlertService.confirm(message, {
            title: 'Error',
            icon: 'error',
            showCancelButton: false
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                this.authService.clearStorage();
                this.router.navigate(['/login']);
            }
        });
    }

    private displayValidationErrors(error: any): void {
        const { errors } = error;

        let html = `<br /><ul class="text-left">`;

        errors.forEach((err: any) => {
            html += `<li>${ err.message }</li>`;
        });

        html += `</ul>`;

        this.sweetAlertService.error(null, { html });
    }
}
