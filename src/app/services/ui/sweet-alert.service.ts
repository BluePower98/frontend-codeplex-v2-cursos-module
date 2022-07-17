import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    constructor() {}

    success(message: string, opts: SweetAlertOptions = {}) {
        const options: SweetAlertOptions = {
            title: 'Éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }

        return this.present(message, {...options, ...opts});
    }

    error(message: string, opts: SweetAlertOptions = {}) {
        const options: SweetAlertOptions = {
            title: 'Error!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        }

        return this.present(message, {...options, ...opts});
    }

    warning(message: string, opts: SweetAlertOptions = {}) {
        const options: SweetAlertOptions = {
            title: 'Cuidado!',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        }

        return this.present(message, {...options, ...opts});
    }

    confirm(message: string, opts: SweetAlertOptions = {}) {
        const options: SweetAlertOptions = {
            title: 'Confirmar',
            icon: 'question',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            // buttonsStyling: false,
        }

        return this.present(message, {...options, ...opts});
    }

    present(message: string, opts: SweetAlertOptions) {
        return Swal.fire({...opts, text: message});
    }
}
