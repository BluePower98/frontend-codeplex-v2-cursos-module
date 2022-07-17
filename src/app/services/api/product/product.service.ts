import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;
// const ENDPOINT_URL = `${BASE_URL}/Productos`;
// const ENDPOINT_URL = `${BASE_URL}/Productos`;

const ENDPOINT_URL = `${BASE_URL}/v1/products`;

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  /* getProducts(companyId: string, productTypeId: number, params: any): Observable<any> {
    const queryParams: string = params ? `?${$.param(params)}` : '';

    return this.http.get<any>(`${ENDPOINT_URL}/all/${companyId}/${productTypeId}${queryParams}`);
  } */

  getDatatablesProducts(body: any, queryParams: any = {}): Observable<any> {
    queryParams = queryParams ? `?${$.param(queryParams)}` : '';

    return this.http.post<any>(`${ ENDPOINT_URL }/datatables${queryParams}`, body);
  }

  getProductById(companyId: string, productId: number): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/GetProductosId/${companyId}/${productId}`);
    return this.http.get<any>(`${ ENDPOINT_URL }/${productId}?idempresa=${companyId}`)
      .pipe(
        map(res => res.data)
      );
  }

  getComboTipoproductos(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/products-types`)
      .pipe(
        map(res => res.data)
      )
  }

  getComboLineas(companyId: string, productTypeId: number): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/GetComboLineas/${companyId}/${productTypeId}`);
    // return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/lines?idtipoproducto=${productTypeId}`)
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/products-types/${productTypeId}/lines`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map((item: any) => {
            return {
              Id: item.idlinea,
              ItemName: item.descripcion
            }
          })
        })
      );
  }
  
  getComboLineassub(companyId: string, productTypeId: number, lineId: number): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/GetComboLineassub/${companyId}/${productTypeId}/${lineId}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/companies/${companyId}/lines/${lineId}/products-types/${productTypeId}/sub-lines`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map((item: any) => {
            return {
              Id: item.idlineasub,
              ItemName: item.descripcion
            }
          })
        })
      );
  }

  getComboSunatt07(): Observable<any> {
    // Select idsunatt07 As Id,  descripcion As ItemName From st_sunatt07_tipo_afectaciones;
    // return this.http.get<any>(`${ENDPOINT_URL}/GetComboSunatt07`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/v1/sunatt07-types-affectations`)
      .pipe(
        map(res => res.data),
        map(data => {
          return data.map((item: any) => {
            return {
              Id: item.idsunatt07,
              ItemName: item.descripcion
            }
          })
        })
      );

  }

  getCodigoProducto(companyId: string, productTypeId: number, lineId?: number, subLineId?: number): Observable<any> {
    // return this.http.get<any>(`${ENDPOINT_URL}/getCodigoProducto/${companyId}/${productTypeId}/${lineId}/${subLineId}`);
    return this.http.post<any>(`${ ENDPOINT_URL }/generate-code`, {
      idempresa: companyId,
      idtipoproducto: productTypeId,
    })
    .pipe(
      map(res => res.data)
    )
  }

  CreateUpdateProductos(params: any, action: string, addedFiles: File[] = [], uploadPath: string): Observable<any> {
    params['itemPrecios'] = JSON.stringify(params['itemPrecios']);

    const formData: FormData = new FormData();

    for (let key in params) {
      if (params[key]) {
        formData.append(key, params[key]);
      }
    }

    addedFiles.forEach((file: any, index: number) => {
      formData.append(`imagen${index + 1}`, file);
    });

    formData.append('upload_path', uploadPath);

    return this.http.post<any>(ENDPOINT_URL, formData);
  }

  validarEliminacion(companyId: string, productId: number): Observable<any> {
    return this.http.get<any>(`${ENDPOINT_URL}/validarEliminacion/${companyId}/${productId}`);
  }

  DeleteProductos(companyId: string, productId: number): Observable<any> {
    return this.http.delete<any>(`${ENDPOINT_URL}/DeleteProductos/${companyId}/${productId}`);
  }

  exportDataProducts(companyId: string, productTypeId: number): Observable<any> {
    return this.http.get(`${ENDPOINT_URL}/exportDataProducts/${companyId}/${productTypeId}`);
  }

  importDataProducto(items: any[]): Observable<any> {
    return this.http.post(`${ENDPOINT_URL}/importDataProducto`, items);
  }

  deleteDataProducto(companyId: string, productTypeId: number): Observable<any> {
    return this.http.delete(`${ENDPOINT_URL}/deleteDataProducto/${companyId}/${productTypeId}`);
  }

}
