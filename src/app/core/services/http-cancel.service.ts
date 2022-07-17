import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class HttpCancelService {

  private cancelPendingRequests$ = new Subject<void>();

  constructor() { }

  public cancelPendingRequests(): void {
    this.cancelPendingRequests$.next();
  }

  public onCancelPendingRequests(): Observable<void> {
    return this.cancelPendingRequests$.asObservable();
  }
}
