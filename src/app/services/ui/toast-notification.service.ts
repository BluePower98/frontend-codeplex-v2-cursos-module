import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {

    private readonly defaultOptions: Partial<IndividualConfig> = {
        progressBar: true, 
        progressAnimation: 'increasing', 
        enableHtml: true
    }

    constructor(
        private toastr: ToastrService
    ) {}

    success(message: string, title = 'Éxito', opts?: Partial<IndividualConfig>): void {
        this.toastr.success(message, title, {...this.defaultOptions, ...opts});
    }

    warning(message: string, title = 'Error', opts?: Partial<IndividualConfig>): void {
        this.toastr.warning(message, title, {...this.defaultOptions, ...opts});
    }

    error(message: string, title = 'Error', opts?: Partial<IndividualConfig>): void {
        this.toastr.error(message, title, {...this.defaultOptions, ...opts});
    }
}
