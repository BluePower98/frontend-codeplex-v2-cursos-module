import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  transform(value: any, field: string): any {
    if (value) {
      const groupedObject: any = value.reduce((prev: any, item: any) => {
        if (!item[field]) {
          return prev;
        }

        (prev[item[field]] = prev[item[field]] || []).push(item);
        return prev;
      }, {});

      return Object.keys(groupedObject).map((key: any) => ({ ItemName: key }));
    }
  }
}
