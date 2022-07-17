import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'auth-unauthorized',
    templateUrl: './unauthorized.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UnauthorizedComponent implements OnInit, OnDestroy
{
    countdown: number = 8;
    countdownMapping: any = {
        '=1'   : '# segundo',
        'other': '# segundos'
    };
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
    constructor(
        private router: Router
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Redirect after the countdown
        timer(1000, 1000)
            .pipe(
                finalize(() => this.goToLoginPage()),
                takeWhile(() => this.countdown > 0),
                takeUntil(this.componentDestroyed$),
                tap(() => this.countdown--)
            )
            .subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    goToLoginPage() {
        window.open('http://localhost:4200?redirect_from=module', '_self');
    }
}
