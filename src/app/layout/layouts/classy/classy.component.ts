import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { User } from 'app/core/user/user.types';
import { AuthService } from '@core/services/auth/auth.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    styleUrls: ['classy.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation = {
        default: []
    };
    user: User;
    moduleTitle: string;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private authService: AuthService,
        private fuseMediaWatcherService: FuseMediaWatcherService,
        private fuseNavigationService: FuseNavigationService,
    ) {
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.componentDestroyed$)
            )
            .subscribe(() => {
                this.settingModuleTitle();
            });

        this.navigationService.navigation$
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(navigation => {
                this.navigation = navigation;

                this.settingModuleTitle();
            });

        // Información del usuario.
        this.user = this.authService.getUserDataFromStorage();

        // Subscribe to media changes
        this.fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    toggleNavigation(name: string): void {
        const navigation = this.fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            navigation.toggle();
        }
    }

    private settingModuleTitle() {
        let children = [];

        this.navigation.default.forEach(item => {
            children = [...children, ...item.children];
        }); 

        const pathName = window.location.pathname;

        this.moduleTitle = children.find(child => {
            return child.link === pathName || child.link === decodeURIComponent(pathName);
        })?.title;
    }
}
