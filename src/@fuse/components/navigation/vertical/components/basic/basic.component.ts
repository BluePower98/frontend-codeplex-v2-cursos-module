import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseVerticalNavigationComponent } from '@fuse/components/navigation/vertical/vertical.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { MenuOptions } from '@fuse/constants/menu-options.constant';
import { FuseConfigService } from '@fuse/services/config';
import { OnDemandPreloadService } from '@fuse/services/preloading-strategies/on-demand-preload.service';

@Component({
    selector: 'fuse-vertical-navigation-basic-item',
    templateUrl: './basic.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseVerticalNavigationBasicItemComponent implements OnInit, OnDestroy {
    @Input() item: FuseNavigationItem;
    @Input() name: string;

    isActiveMatchOptions: IsActiveMatchOptions;
    private fuseVerticalNavigationComponent: FuseVerticalNavigationComponent;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private fuseNavigationService: FuseNavigationService,
        private fuseUtilsService: FuseUtilsService,
        private fuseConfigService: FuseConfigService,
        private router: Router,
        private onDemandPreloadService: OnDemandPreloadService
    ) {
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this.fuseUtilsService.subsetMatchOptions;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.item.function = (item: FuseNavigationItem) => {
            if (this.fuseConfigService.getModeOpenMenuOptions() === MenuOptions.newWindow) {
                window.open(`${window.location.origin}${item.link}`, '_blank');
            } else {
                this.router.navigate([item.link]);
            }
        };

        this.isActiveMatchOptions = this.fuseUtilsService.exactMatchOptions;

        // Get the parent navigation component
        this.fuseVerticalNavigationComponent = this.fuseNavigationService.getComponent(this.name);

        // Mark for check
        this.changeDetectorRef.markForCheck();

        // Subscribe to onRefreshed on the navigation component
        this.fuseVerticalNavigationComponent.onRefreshed
            .pipe(
                takeUntil(this.componentDestroyed$)
            ).subscribe(() => {
                // Mark for check
                this.changeDetectorRef.markForCheck();
            });
    }

    preloadBundle(path: string): void {
        const route = path.split('/').pop();

        this.onDemandPreloadService.startPreload(route);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
