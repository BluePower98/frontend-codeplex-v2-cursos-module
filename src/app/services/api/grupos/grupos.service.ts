import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/ModuleCourse-Groups`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }

  getDatatablesGrupos(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
   }   

  registrarGrupos(body: any): Observable<any> 
  {
    return this.http.post<any>(`${ ENDPOINT_URL }`, body)
  } 

  EditarGrupos(idempresa:string, idgrupo:string, body:any)
  {
    const url = `${ENDPOINT_URL}/${idempresa}/${idgrupo}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idgrupo:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idgrupo}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EliminarGrupo(idempresa:string, idgrupo:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${idgrupo}`;

    return this.http.delete<any>(url);
  }

  TraerCursos(idempresa:string){
    const url = `${ENDPOINT_URL}/${idempresa}`;

    return this.http.get<any>(url).pipe(
      map(res=>res.data)
  );
  }
  TraerMonedas(){
    const url = `${ENDPOINT_URL}`;

    return this.http.get<any>(url).pipe(
      map(res=>res.data)
  );
  }
}
