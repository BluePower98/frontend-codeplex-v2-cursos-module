import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/Cursos_Comentarios`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  getDatatablesComentarios(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
  }

  RegistrarComentarios(body: any): Observable<any> {
    return this.http.post<any>(`${ ENDPOINT_URL }`, body)
  }

  EditarComentarios(idempresa:string, idcomentarios:string, body:any){
    const url = `${ENDPOINT_URL}/${idempresa}/${idcomentarios}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idcomentarios:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idcomentarios}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EliminarComentarios(idempresa:string, idcomentarios:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${idcomentarios}`;

    return this.http.delete<any>(url);
  }
}
