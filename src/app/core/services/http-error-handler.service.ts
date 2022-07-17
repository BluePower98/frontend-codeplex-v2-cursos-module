import { Injectable } from '@angular/core';

export enum ErrorHandler {
  manual = 'manual',
  automatic = 'automatic'
}

@Injectable()
export class HttpErrorHandlerService {

  private handler: ErrorHandler = ErrorHandler.automatic;

  constructor() { }

  setHandler(handler: ErrorHandler): void {
      this.handler = handler;
  }

  getHandler(): ErrorHandler {
      return this.handler;
  }

  isAutomatic(): boolean {
    return this.handler === ErrorHandler.automatic;
  }

  isManual(): boolean {
    return this.handler === ErrorHandler.manual;
  }

 
}
