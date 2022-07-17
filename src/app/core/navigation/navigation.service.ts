import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { environment } from '@environments/environment';

const BASE_URL = environment.apiBaseUrl;
const ENDPOINT_URL = `${BASE_URL}/v1`;

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private navigation: BehaviorSubject<Navigation> = new BehaviorSubject<Navigation>({ default: []});

    constructor(
        private http: HttpClient
    ) { }

    get navigation$(): Observable<Navigation> {
        return this.navigation.asObservable();
    }

    get(idplan: number): Observable<any> {
        return this.http.get(`${ENDPOINT_URL}/modules/${environment.module.id}/plans/${idplan}/menu`)
            .pipe(
                map((res: any) => res.data),
                tap((data: any) => {
                    console.log('GET MENU', data);
                }),
                map((res: Array<any>) => {
                    const menu = res.map((item: any) => {

                        const { title, collapse, childrens } = item;

                        const id = this.getMenuIdFromTitle(title);
                        const link = id === 'home' ? '/dashboard/home' : `/dashboard/${collapse}`;
                        const icon = id === 'home' ? 'heroicons_outline:home' : 'heroicons_outline:template';

                        const children: any[] = ((childrens || []) as Array<any>).map((child: any) => {
                            const { title, path } = child;
                            return {
                                id: `${id}.${this.getMenuIdFromTitle(title)}`,
                                title,
                                type: 'basic',
                                link: `${link}/${path}`
                            };
                        });

                        return {
                            id,
                            title,
                            type: children.length > 0 ? 'collapsable' : 'basic',
                            icon,
                            link,
                            children
                        };
                    });

                    return {
                        default: menu
                    };
                }),
                tap((navigation) => this.navigation.next(navigation))
            );
    }

    private getMenuIdFromTitle(title: string): string {
        return title.toLowerCase().replace(/ /g, '');
    }
}
