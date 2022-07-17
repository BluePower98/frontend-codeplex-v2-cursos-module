import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/Lineas`;

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private http: HttpClient
  ) { }

  GetLineas(companyId: number, productTypeId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetLineas/${companyId}/${productTypeId}`);
  }

  CreateUpdateLineas(params: any, action: string): Observable<any> {
    return this.http.post(`${ ENDPOINT_URL }/CreateUpdateLineas/${action}`, params);
  }

  DeleteLineas(companyId: string, productTypeId: number, lineId: number): Observable<any> {
    return this.http.delete(`${ ENDPOINT_URL }/DeleteLineas/${companyId}/${productTypeId}/${lineId}`);
  }

  GetLineasId(companyId: string, productTypeId: number, lineId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetLineasId/${companyId}/${productTypeId}/${lineId}`);
  }

  GetComboTipoproductos(productTypeId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetComboTipoproductos/${productTypeId}`);
  }
}
