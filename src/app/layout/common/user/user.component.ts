import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import { MenuOptions } from '@constants/menu-options.constant';
import { STORAGE_MENU_OPTIONS } from '@constants/storage.constant';
import { LoadingController } from '@controllers/loading.controller';
import { finalize } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, AfterViewInit {
    @ViewChild('slideToggle', { static: false }) slideToggle: MatSlideToggle
    @Input() showAvatar: boolean = true;
    user: User;
    menuOptions: MenuOptions = MenuOptions.normal;

    constructor(
        private authService: AuthService,
        private fuseConfigService: FuseConfigService,
        private cdr: ChangeDetectorRef,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit(): void {
        this.user = this.authService.getUserDataFromStorage();
    }

    ngAfterViewInit(): void {
        if (sessionStorage.getItem(STORAGE_MENU_OPTIONS)) {
            this.menuOptions = sessionStorage.getItem(STORAGE_MENU_OPTIONS) as MenuOptions;
            this.fuseConfigService.setModeOpenMenuOptions(this.menuOptions);
            this.slideToggle.checked = this.menuOptions === MenuOptions.newWindow;
            this.cdr.detectChanges();
        }
    }

    signOut(): void {
        const loading = this.loadingCtrl.create();

        loading.present();

        this.authService.logout()
            .pipe(
                finalize(() => loading.dismiss())
            )
            .subscribe(() => window.open('http://localhost:4200?redirect_from=module', '_self'));
    }

    onChangeToOpenMenuOptions($event: MatSlideToggleChange): void {
        const value = $event.checked ? MenuOptions.newWindow : MenuOptions.normal;

        this.fuseConfigService.setModeOpenMenuOptions(value);

        sessionStorage.setItem(STORAGE_MENU_OPTIONS, value);
    }
}
