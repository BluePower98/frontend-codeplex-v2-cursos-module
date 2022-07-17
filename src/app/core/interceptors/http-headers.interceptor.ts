import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('access_token');
        const headers: any = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        request = request.clone({
            setHeaders: headers
        });

        return next.handle(request);
    }
}
