import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/Cursos_Cursos`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  getDatatablesCursos(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
   }

   RegistrarCurso(body: any): Observable<any> {
    return this.http.post<any>(`${ ENDPOINT_URL }`, body)
  }

  EditarCurso(idempresa:string, idcurso:string, body:any){
    const url = `${ENDPOINT_URL}/${idempresa}/${idcurso}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idcurso:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idcurso}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  TraerEspecialidad(idempresa:string){
    const url = `${ENDPOINT_URL}/${idempresa}`;

    return this.http.get<any>(url).pipe(
      map(res=>res.data)
  );
  }
}
