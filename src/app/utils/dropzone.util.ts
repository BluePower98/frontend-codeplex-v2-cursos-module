import { Injectable } from '@angular/core';

declare const $: any;

@Injectable()
export class DropzoneUtils {

    setthumbnailImage(file: File) {
        const previewElement = file['previewElement'];
        const thumbnail = this.getThumbnailImage(file);

        if (thumbnail) {
          $(previewElement).find('.dz-image img[data-dz-thumbnail]').attr('src', thumbnail);
        }
    }

    getThumbnailImage(file: File) {
        const ext = file.name.split('.').pop();

        let thumbnail = null;

        if (ext === 'pdf') {
            thumbnail = 'assets/img/pdf.png';
        } else if (ext.indexOf('doc') !== -1) {
            thumbnail = 'assets/img/word.png';
        } else if (ext.indexOf('xls') !== -1) {
            thumbnail = 'assets/img/excel.png';
        }

        return thumbnail;
    }
}
