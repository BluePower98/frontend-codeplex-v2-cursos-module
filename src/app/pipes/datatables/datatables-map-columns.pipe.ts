import { Pipe, PipeTransform } from '@angular/core';
import { SearchTypeDatatable } from '@constants/datatables/datatables.constant';
import { DataTablesColumnsSearchType } from '@interfaces/datatables/datatables.interface';

@Pipe({
  name: 'datatablesMapColumns'
})
export class DatatablesMapColumnsPipe implements PipeTransform {

  transform(columns: Array<any>, columnsSearchType: DataTablesColumnsSearchType = {}): unknown {

    console.log({columnsSearchType});

    return columns
        .map((column: any, index: number) => {
            const visible = column.hasOwnProperty('visible') ? column.visible : true;

            return {
                ...column,
                index,
                searchable: column.hasOwnProperty('searchable') ? column.searchable : true,
                orderable: column.hasOwnProperty('orderable') ? column.orderable : true,
                visible,
                has_display_none: visible === false,
                filter_type: this.getFilterType(column.data || 'UNKNOWN', columnsSearchType)
            }
        });
  }

  private getFilterType(key: string, columnsSearchType: DataTablesColumnsSearchType): string {
    if (!columnsSearchType.hasOwnProperty(key)) {
        return SearchTypeDatatable.contain;
    }

    if (columnsSearchType[key] === SearchTypeDatatable.startWith) {
        return SearchTypeDatatable.startWith;
    } 

    return SearchTypeDatatable.contain;
  }

}