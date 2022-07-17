import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@core/services/auth/auth.service";
import { catchError, finalize, tap } from 'rxjs/operators';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ErrorHandler, HttpErrorHandlerService } from "@core/services/http-error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class ValidAccessResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private authService: AuthService,
        private sweetAlerService: SweetAlertService,
        private httpErrorHandlerService: HttpErrorHandlerService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const { token, plan_id } = route.params;

        this.httpErrorHandlerService.setHandler(ErrorHandler.manual);

        // TODO: Validar planId lo contiene el modulo definido en este proyecto.

        return this.authService.validateToken(token)
            .pipe(
                tap(() => {
                    sessionStorage.setItem("plan_id", plan_id);

                    this.router.navigate(['/dashboard']);
                }),
                catchError(() => {
                    return this.router.navigate(['/unauthorized']);
                }),
                finalize(() => {
                    this.httpErrorHandlerService.setHandler(ErrorHandler.automatic)
                })
            );
    }
    
}