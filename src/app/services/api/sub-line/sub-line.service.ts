import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/Lineassub`;

@Injectable({
  providedIn: 'root'
})
export class SubLineService {

  constructor(
    private http: HttpClient
  ) { }

  GetLineassub(companyId: string, productTypeId: number, lineId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetLineassub/${companyId}/${productTypeId}/${lineId}`);
  }

  CreateUpdateLineassub(params: any, action: string): Observable<any> {
    return this.http.post(`${ ENDPOINT_URL }/CreateUpdateLineassub/${action}`, params);
  }

  DeleteLineassub(
    companyId: string,
    productTypeId: number,
    lineId: number,
    subLineId: number
  ): Observable<any> {
    const url = `${ ENDPOINT_URL }/DeleteLineassub/${companyId}/${productTypeId}/${lineId}/${subLineId}`;

    return this.http.delete(url);
  }

  GetLineassubId(
    companyId: string,
    productTypeId: number,
    lineId: number,
    subLineId: number
  ): Observable<any> {
    const url = `${ ENDPOINT_URL }/GetLineassubId/${companyId}/${productTypeId}/${lineId}/${subLineId}`;

    return this.http.get(url);
  }

  GetComboTipoproductos(productTypeId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetComboTipoproductos/${productTypeId}`);
  }

  GetComboLineas(companyId: string, productTypeId: number, lineId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetComboLineas/${companyId}/${productTypeId}/${lineId}`);
  }
}
