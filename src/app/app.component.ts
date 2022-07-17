import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HttpCancelService } from '@core/services/http-cancel.service';

import { filter } from 'rxjs';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private httpCancelService: HttpCancelService
    )
    {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationStart)
            )
            .subscribe(() => this.httpCancelService.cancelPendingRequests());
    }
}
