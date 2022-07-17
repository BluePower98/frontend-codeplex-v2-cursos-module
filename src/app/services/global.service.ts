import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { map, tap } from 'rxjs/operators';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/v1`;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private months: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private years: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient
  ) {}

  get months$(): Observable<Array<any>> {
    return this.months.asObservable();
  }

  get years$(): Observable<Array<any>> {
    return this.years.asObservable();
  }

  getMeses(): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/months`)
      .pipe(
        map((res: any) => res.data),
        tap(data => this.months.next(data))
      )
  }

  getAnio(): Observable<any> {
    return this.http.get(`${ ENDPOINT_URL }/years`)
      .pipe(
        map((res: any) => res.data),
        tap(data => this.years.next(data))
      )
  }
}
