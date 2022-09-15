import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;

const ENDPOINT_URL = `${BASE_URL}/v1/proveedores`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private http: HttpClient
  ) { }

  getDatatablesProveedores(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables${queryParams}`, body);
  }

  ConsultarDni(rucdni:string){
    let  rucdni1; 
    if (rucdni.split('').length=8){
      rucdni1 = rucdni;
    }else if(rucdni.split('').length=11){
      rucdni1 = rucdni;
    }

    return this.http.get<any>(`https://backend.codeplex.pe/Servicios/consultaDocumento/${rucdni}` );

  }

  RegistrarProveedores(body: any): Observable<any> {
    return this.http.post<any>(`${ ENDPOINT_URL }`, body);                           
  }

  TraerData(idempresa:string, rucdni:string){
    const url=`${ENDPOINT_URL}/${idempresa}/${rucdni}`;

    return this.http.get<any>(url).pipe(map(r=>r.data));
  }

  EditarProveedores(idempresa:string, rucdni:string, body: any){
    const url = `${ENDPOINT_URL}/${idempresa}/${rucdni}`;

    return this.http.put<any>(url, body);
  }

  EliminarProveedor(idempresa:string, rucdni:string){
    const url = `${ENDPOINT_URL}/${idempresa}/${rucdni}`;

    return this.http.delete<any>(url);
  }

  Ubigeo(idubigeo:string){
    const url=`${ENDPOINT_URL}/${idubigeo}`;
      return this.http.get<any>(url)
                  .pipe(
                    map(res=>res.data),
                    map(data=>{
                      return data.map(item=>{
                        return { id:item.Id,
                                 nombre:item.departamento.concat('-',item.provincia,'-',item.distrito)   
                        }
                      })
                    })
                  )
  }
}
