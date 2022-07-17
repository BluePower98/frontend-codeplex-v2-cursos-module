import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { NavigationService } from "@core/navigation/navigation.service";
import { ErrorHandler, HttpErrorHandlerService } from "@core/services/http-error-handler.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen";
import { UserService } from "@services/api/user/user.service";
import { GlobalService } from "@services/global.service";
import { forkJoin, finalize} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardDataResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private globalService: GlobalService,
        private userService: UserService,
        private fuseSplashScreenService: FuseSplashScreenService,
        private httpErrorHandlerService: HttpErrorHandlerService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!sessionStorage.getItem("plan_id")) {
            return this.router.navigate(['/unauthorized']);
        }

        // const planId = 1000;
        const planId = Number(sessionStorage.getItem("plan_id"));
        const userId = sessionStorage.getItem('idusuario');

        this.fuseSplashScreenService.show();

        this.httpErrorHandlerService.setHandler(ErrorHandler.manual);

        return forkJoin([
            this.navigationService.get(planId),
            this.globalService.getMeses(),
            this.globalService.getAnio(),
            this.userService.getCompaniesByUser(userId)
        ])
        .pipe(
            catchError(() => {
                return this.router.navigate(['/unauthorized']);
            }),
            finalize(() => {
                this.httpErrorHandlerService.setHandler(ErrorHandler.automatic);
                setTimeout(() => this.fuseSplashScreenService.hide(), 0)
            })
        )
    }
    
}