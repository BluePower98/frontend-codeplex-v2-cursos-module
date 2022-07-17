import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpCancelService } from '@core/services/http-cancel.service';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {

    constructor(
        private httpCancelService: HttpCancelService
    ) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                takeUntil(this.httpCancelService.onCancelPendingRequests())
            );
    }
}
