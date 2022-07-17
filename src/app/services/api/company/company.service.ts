import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, Observable } from "rxjs";

const BASE_URL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    constructor(
        private http: HttpClient
    ) {}

    getSucursales(companyId: any, userId: any): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/users/${userId}/sucursales`)
            .pipe(
                map(res => res.data)
            );
    }
}