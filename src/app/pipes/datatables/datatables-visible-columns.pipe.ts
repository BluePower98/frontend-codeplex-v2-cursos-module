import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datatablesVisibleColumns'
})
export class DatatablesVisibleColumnsPipe implements PipeTransform {

  transform(columns: Array<any>, visible: boolean): unknown {
    return columns.filter(column => column.visible === visible);
  }

}