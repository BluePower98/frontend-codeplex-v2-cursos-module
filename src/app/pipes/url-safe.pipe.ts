import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'urlSafe'
})
export class UrlSafePipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  transform(value: any, url: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${url}${value}`);
  }

}
