import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { timer, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '@services/api/user/user.service';

@Injectable()
export class RucValidator {

    constructor(
        private userService: UserService
    ) {}

    exist(data$?: BehaviorSubject<any>) {
        return (control: AbstractControl) => {
            return timer(250).pipe(
                switchMap(() => this.userService.validarRuc(control.value)),
                map(res => {
                    const { success } = res;

                    if (data$) {
                        success ? data$.next(res.data) : data$.next(null);
                    }

                    if (success) {
                        return null;
                    }

                    return { not_exist: true };
                })
            );
        };
    }

    unique() {
        return (control: AbstractControl) => {
            return timer(250).pipe(
                switchMap(() => this.userService.validateUniqueRuc(control.value)),
                map(res => {
                    if (res.is_unique) {
                        return null;
                    }

                    return { not_unique: true };
                })
            );
        };
    }
}
