import { ViewContainerRef, TemplateRef } from '@angular/core';
import { DataTablesRenderColumnOptions } from '@interfaces/datatables/datatables.interface';

export class DatatablesUtils {

    static PAGE_LENGTH_DEFAULT = 50;

    static LENGTH_MENU: any[] = [[10, 25, 50, 100], [10, 25, 50, 100]];

    static LANGUAGE: any = {
        url: 'assets/data/datatables/i18n/Spanish.json'
    };

    static DOM: any = {
        // default: '<"wrapper-dt-header" lf><"wrapper-dt-view-table"tr>ip',
        default: '<"wrapper-dt-header" lf><"wrapper-dt-view-table"t>rip',
    };

    /**
   * 
   * @param vcr 
   * @param template 
   * @returns 
   */
    static rowCallbackWithTemplateRef(vcr: ViewContainerRef, template: TemplateRef<any>, callback?: Function) {
        return (row: Node, data: any[] | any, index: number): Node => {
            DatatablesUtils.renderColumnWithTemplateRef({
                row,
                data,
                index,
                vcr,
                template,
                callback
            });

            return row;
        };
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    static renderColumnWithTemplateRef(options: DataTablesRenderColumnOptions): void {
        const { row, data, index, vcr, template, callback } = options;

        let lastIndexVisible = -1;

        row.childNodes.forEach((td: HTMLElement, key: number) => {

            if (td.style.display !== "none") {
                lastIndexVisible = key;
            }

            td.classList.remove('last-td-item');

            if (td.classList.contains('dt-container-actions')) {
                const ref = vcr.createEmbeddedView(template, { data });
                td.appendChild(ref.rootNodes[0]);
            }

            if (typeof callback === 'function') {
                callback(td, data);
            }
        });

        if (lastIndexVisible === -1) {
            return;
        }

        (row.childNodes.item(lastIndexVisible) as HTMLElement).classList.add('last-td-item');
    }

    static renderEllipsisText(length: number) {
        return function (data: any, type: any, row: any, meta: any) {
            if (data === null) {
                return '';
            }

            let text = data;

            if (type === 'display' && data.length > length) {
                text = `
              <span class="dt-content-ellipsis">${data.substr(0, length)}</span>
              <span class="dt-content-without-ellipsis">${data}</span>
              <span class="dt-tooltip-cell">${data}</span>
              `;
            }

            return text;
        };
    }

    static eventHideSearchInputsx(columns: any, table: HTMLElement): void {
        const length = columns.length;

        for (let i = 0; i < length; i++) {
            if (columns[i] === true) {
                $('.dt-filters-head th:eq(' + i + ')').show();
            } else {
                $('.dt-filters-head th:eq(' + i + ')').hide();
            }
        }
    }

    /**
     * 
     * @param columns 
     * @param table 
     * @returns 
     */
    static eventHideSearchInputs(columns: Array<boolean>, table: HTMLElement): void {
        const { length } = columns;

        const theadColsFilter = table.querySelectorAll('thead tr.dt-filters-head th') as NodeList;

        if (theadColsFilter.length === 0) {
            return;
        }

        for (let i = 0; i < length; i++) {
            let display = columns[i] === true ? '' : 'none';

            const th = theadColsFilter.item(i) as HTMLElement;

            if (th) {
                th.style.display = display;
            }
        }
    }
}
