import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCancelService } from '../services/http-cancel.service';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {

    constructor(
        private httpCancelService: HttpCancelService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                takeUntil(this.httpCancelService.onCancelPendingRequests())
            );
    }
}
