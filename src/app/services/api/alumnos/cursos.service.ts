import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/Cursos_Alumnos`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {
    
   }

   // Servicios de Alumnos

   getDatatablesAlumnos(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
   }

   RegistrarAlumnos(body: any, addedFiles:File[],uploadPath: string): Observable<any> {
    const formData:FormData=new FormData();
    for(let key in body){
        if(body[key]){
          formData.append(key,body[key]);
        }
    }
    addedFiles.forEach((file: any, index: number) => {
      formData.append(`foto`, file);
    });
    const url=`${ENDPOINT_URL}/parameter`;
    formData.append('upload_path', uploadPath);

    return this.http.post<any>(`${ ENDPOINT_URL }`,formData);
  }

  EditarAlumno(idempresa:string, idalumno:string, body:any){
    const url = `${ENDPOINT_URL}/${idempresa}/${idalumno}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idalumno:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idalumno}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EliminarAlumno(idempresa:string, idalumno:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${idalumno}`;

    return this.http.delete<any>(url);
  }
}
