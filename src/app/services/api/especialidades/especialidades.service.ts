import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/ModuleCourse-Specialties`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private http: HttpClient) { }

  getDatatablesEspecialidades(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
   }

  RegistrarEspecialidades(body: any): Observable<any> {
    return this.http.post<any>(`${ ENDPOINT_URL }`, body)
  }

  EditarEspecialidades(idempresa:string, idespecialidad:string, body:any){
    const url = `${ENDPOINT_URL}/${idempresa}/${idespecialidad}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idespecialidad:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idespecialidad}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EliminarEspecialidad(idempresa:string, idespecialidad:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${idespecialidad}`;

    return this.http.delete<any>(url);
  }
}
