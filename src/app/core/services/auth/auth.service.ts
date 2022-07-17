import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { tap, map, switchMap } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_AUTH = `${BASE_URL}/auth`;

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }

    login(params: any): Observable<any> {
        return this.http.post(`${ ENDPOINT_AUTH }/login`, params)
            .pipe(
                map((res: any) => res.data),
                tap(data => this.saveTokenStorage(data)),
                switchMap(() => this.me()),
                tap(data => this.saveUserStorage(data))
            );
    }

    me(): Observable<any> {
        return this.http.get(`${ ENDPOINT_AUTH }/me`)
            .pipe(
                map((res: any) => res.data),
            );
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${ ENDPOINT_AUTH }/forgot-password`, { email });
    }

    verifyTokenResetPassword(token: string): Observable<any> {
        return this.http.get<any>(`${ ENDPOINT_AUTH }/reset_password/verify/${token}`);
    }

    resetPassword(params: any, token: string): Observable<any> {
        params = { ...params, token };

        return this.http.post(`${ ENDPOINT_AUTH }/reset_password/update`, params);
    }

    validateToken(token: string): Observable<any> {
        return this.http.get(`${ ENDPOINT_AUTH }/validate-token/${token}`)
            .pipe(
                map((res: any) => res.data),
                tap(data => {
                    this.saveTokenStorage({ access_token: token, token_type: 'bearer' });
                    this.saveUserStorage(data);
                })
            );
    }

    logout(): Observable<any> {
        return this.http.get(`${ ENDPOINT_AUTH }/logout`)
            .pipe(
                tap(() => this.clearStorage())
            );
    }

    saveUserStorage(payload: any): void {
        const { idusuario, nombre, loglogin } = payload;

        sessionStorage.setItem('idusuario', idusuario);
        sessionStorage.setItem('user', nombre);
        sessionStorage.setItem('emailuser', loglogin);
    }

    saveTokenStorage(payload: any): void {
        const { access_token, token_type } = payload;

        sessionStorage.setItem('access_token', access_token);
        sessionStorage.setItem('token_type', token_type);
    }

    clearStorage(): void {
        sessionStorage.clear();
    }

    isAuthenticated(): Observable<boolean> {
        if (!this.getTokenAuthenticated()) {
            return of(false);    
        }

        return of(true);
    }

    getTokenAuthenticated(): string {
        return sessionStorage.getItem('access_token');
    }

    getUserDataFromStorage(): any {
        const userId = sessionStorage.getItem('idusuario');
        const email = sessionStorage.getItem('emailuser');
        const name = sessionStorage.getItem('user');

        return {
            id: userId,
            name,
            email
        }
    }
}