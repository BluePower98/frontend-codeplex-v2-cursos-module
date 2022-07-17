import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/Zonasprecios`;

@Injectable({
  providedIn: 'root'
})
export class PricesZoneService {

  constructor(
    private http: HttpClient
  ) { }

  getZonasprecios(companyId: string, productId: number): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/getZonasprecios/${companyId}/${productId}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/products/${productId}/companies/${companyId}/zones-prices`)
      .pipe(
        map(res => res.data)
      );
  }

  getComboZonas(companyId: string): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/getComboZonas/${companyId}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/zones`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map(item => {
            return {
              Id: item.idzona,
              ItemName: item.Descripcion,
            }
          })
        })
      );
  }

  getComboMedidas(companyId: string): Observable<any> {

    /* Select 
    idmedida As Id, 
    (descripcion + ' x ' + CONVERT(VARCHAR, equivalencia)) As ItemName 
    From lo_medidas Where idempresa=@idempresa; */

    // return this.http.get<any>(`${ENDPOINT_URL}/getComboMedidas/${companyId}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/measures`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map((item: any) => {
            return {
              Id: item.idmedida,
              ItemName: `${item.descripcion} x ${item.equivalencia.toFixed(4)}`,
            }
          })
        })
      );
  }

  getComboZonasTipoPrecios(): Observable<any> {
    // Select IdTipoPrecio As Id, Descripcion As ItemName From lo_zonastipoprecios;
    // return this.http.get<any>(`${ENDPOINT_URL}/getZonasTipoPrecios`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/zones-prices-types`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map((item: any) => {
            return {
              Id: item.IdTipoPrecio,
              ItemName: item.Descripcion,
            }
          })
        })
      );
  }

  // Eliminar datos importados
  deleteDataZonaPrecios(companyId: string, zoneId: number): Observable<any> {
    return this.http.delete<any>(`${ENDPOINT_URL}/deleteDataZonaPrecios/${companyId}/${zoneId}`);
  }

  getComboTipoproductos(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/Productos/GetComboTipoproductos`);
  }
}
