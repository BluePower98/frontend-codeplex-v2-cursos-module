import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const BASE_URL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root'
})
export class SucursalService {
    constructor(
        private http: HttpClient
    ) {}
}