import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, key: any, arg: any): any {

    /*
      value: array de la lista.
      key: campo de la tabla.
      arg: valor que buscaras.
    */

      const result = [];
      let array = [];

      array = value.filter((dato) => !!dato);  // error lista de ventas

      for (const item of array) {
        if (arg) {
          if ( item.show || String(item[key]) && String(item[key]).toLowerCase().substring(0, arg.length).indexOf(arg.toLowerCase()) > -1) {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      }

      return result;

  }
}
