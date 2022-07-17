import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/Medidas`;

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(
    private http: HttpClient
  ) { }

  GetMedidas(companyId: string): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetMedidas/${companyId}`);
  }
  getCodigoMedidas(): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/getCodigoMedidas`);
  }

  CreateUpdateMedidas(params: any, action: string): Observable<any> {
    return this.http.post(`${ ENDPOINT_URL }/CreateUpdateMedidas/${action}`, params);
  }

  DeleteMedidas(companyId: string, measureId: number): Observable<any> {
    return this.http.delete(`${ ENDPOINT_URL }/DeleteMedidas/${companyId}/${measureId}`);
  }

  GetMedidasId(companyId: string, measureId: number): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/GetMedidasId/${companyId}/${measureId}`);
  }
}
