import { TemplateRef, ViewContainerRef } from "@angular/core";
import { SearchTypeDatatable } from "@constants/datatables/datatables.constant";

export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

export interface DataTablesColumnsSearchType {
    [key: string]: SearchTypeDatatable
};

export interface DataTablesRenderColumnOptions {
    row: Node;
    data: any[];
    index: number;
    vcr: ViewContainerRef;
    template: TemplateRef<any>;
    callback?: Function;
}