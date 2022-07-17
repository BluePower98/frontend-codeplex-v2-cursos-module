import { Injectable } from '@angular/core';

@Injectable()
export class FileUtils {

    static dataURLtoBlob(dataurl: string) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    }

    static blobToDataURL(blob: any, callback: any) {
      const file = new FileReader();

      file.onload = (e: any) => {
        callback(e.target.result);
      };

      file.readAsDataURL(blob);
    }

    static isTheFileAnImage(file: File) {

      console.log('isTheFileAnImage', file);
      
      const extension = file.name.split('.').pop();

      return ['jpg', 'png', 'bmp', 'jpeg', 'gif'].includes(extension);
  }
}
