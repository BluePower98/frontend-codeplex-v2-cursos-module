import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "@environments/environment";

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/v1/users`;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private companiesByUser: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

    constructor(
        private http: HttpClient
    ) {

    }

    get companiesByUser$(): Observable<Array<any>> {
        return this.companiesByUser.asObservable();
    }

    create(data: any): Observable<any> {
        return this.http.post<any>(`${ ENDPOINT_URL }/create`, data);
    }
    
    validarRuc(ruc: string): Observable<any> {
        return this.http.get<any>(`${ ENDPOINT_URL }/validar_ruc/${ruc}`);
    }
    
    validateUniqueRuc(ruc: string): Observable<any> {
        return this.http.get<any>(`${ BASE_URL }/Empresas/check-unique-ruc/${ruc}`);
    }

    getCompaniesByUser(userId: string): Observable<any> {
        return this.http.get(`${ENDPOINT_URL}/${userId}/companies`)
            .pipe(
                map((res: any) => res.data),
                tap(data => this.companiesByUser.next(data))
            )
    }
}