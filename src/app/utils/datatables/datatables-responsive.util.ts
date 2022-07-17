import { TemplateRef, ViewContainerRef } from '@angular/core';

declare const $: any;

export class DatatablesResponsiveUtils {

    static rendererWithTemplateRef(vcr: ViewContainerRef, template: TemplateRef<any>): any {
        return (api: DataTables.Api, rowIdx: number[] | number, columns: Array<any>): false | JQuery<HTMLElement> => {
            const $table = $('<ul data-dtr-index="' + rowIdx + '" class="dtr-details" />');

            let visibles = 0;

            const data = api.row(rowIdx).data();

            columns.forEach((col, i) => {
                const className  = (col.className as string).trim();
                const classNameList = className.split(' ');

                if (col.hidden) {
                    const $li = document.createElement('li');

                    $li.setAttribute('data-dtr-index', col.rowIndex);
                    $li.setAttribute('data-dt-row', rowIdx.toString());
                    $li.setAttribute('data-dt-column', col.columnIndex);
                    $li.setAttribute('class', className);

                    const $spanTitle = document.createElement('span');
                    const $spanData = document.createElement('span');

                    $spanTitle.classList.add('dtr-title');
                    $spanTitle.innerHTML = col.title;
                    $spanData.classList.add('dtr-data');

                    if (classNameList.includes('dt-container-actions')) {
                        const ref = vcr.createEmbeddedView(template, { data });

                        $spanData.append(ref.rootNodes[0]);
                    } else {
                        $spanData.innerHTML = col.data;
                    }

                    $li.append($spanTitle);
                    $li.append($spanData);

                    $table.append($li);
                } else {
                    visibles++;
                }
            });

            return visibles !== columns.length ? $table : false;
        };
    }
}
