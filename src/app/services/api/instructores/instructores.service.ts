import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/ModuleCourse-Instructors`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class InstructoresService {

  constructor(private http: HttpClient) { }

  getDatatablesInstructores(body: any, queryParams: any = {}): Observable<any> 
  {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables`, body);
  }

  RegistrarInstructores(body: any,addedFiles:File[],uploadPath: string): Observable<any> 
  {
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

  EditarInstructores(idempresa:string, idinstructor:string, body:any)
  {
    const url = `${ENDPOINT_URL}/${idempresa}/${idinstructor}`;
    return this.http.put<any>(url, body);
  }

  TraerData(idempresa:string, idinstructor:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${idinstructor}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EliminarInstructor(idempresa:string, idinstructor:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${idinstructor}`;

    return this.http.delete<any>(url);
  }
}
