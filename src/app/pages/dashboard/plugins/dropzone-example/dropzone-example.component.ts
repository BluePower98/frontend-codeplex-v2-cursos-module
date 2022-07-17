import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { DropzoneUtils } from '@utils/dropzone.util';
import { FileUtils } from '@utils/file.util';

import { v5 as uuidv5 } from 'uuid';
import { DropzoneModalPreviewComponent } from '@components/dropzone/dropzone-modal-preview/dropzone-modal-preview.component';

declare var $: any;

const STATUS_CANCELED = 'canceled';

@Component({
  selector: 'app-dropzone-example',
  templateUrl: './dropzone-example.component.html',
  styleUrls: ['./dropzone-example.component.scss']
})
export class DropzoneExampleComponent implements OnInit {

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;

  useDropzoneClass: boolean = false;
  disabled: boolean = false;
  addedFiles: File[] = [];
  config: DropzoneConfigInterface = {};

  items: any[] = [
    {
      id: 1,
      image: 'https://image.tmdb.org/t/p/w220_and_h330_face/5yuIJip8YJQ2rkLs7b7JlR38WY7.jpg',
      type: 'image/jpeg',
      name: '5yuIJip8YJQ2rkLs7b7JlR38WY7.jpg'
    },
    {
      id: 2,
      image: 'https://image.tmdb.org/t/p/w220_and_h330_face/kB1jM3vsbkWBxLo4esCDvgrsZVj.jpg',
      type: 'image/jpeg',
      name: 'kB1jM3vsbkWBxLo4esCDvgrsZVj.jpg'
    },
  ];

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private dropzoneUtils: DropzoneUtils,
  ) { }

  async ngOnInit() {
      await Promise.all(
        this.items.map(async (item) => {
          const dataUrl = await this.getDataUrlFromImage(item.image);

          item.dataURL = dataUrl;

          return item;
        }
      ));

      this.dropInit();
  }

  openModalPreviewFile(file: File): void {
    const isImage: boolean = FileUtils.isTheFileAnImage(file);
    const minWidth: string = isImage ? '600px' : '900px';
    const minHeight: string = isImage ? '400px' : '700px';

    this.ngZone.run(() => {
      this.dialog.open(DropzoneModalPreviewComponent, {
        data: {
          file,
          isImage
        },
        minWidth,
        minHeight
      });
    });
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  onFileAdded(event: any) {
    // console.log('onFileAdded:', event);
  }

  onFileRemoved($event: any) {
    // console.log('onFileRemoved:', $event);
  }

  onUploadInit(args: any): void {
    // console.log('onUploadInit:', args);
  }

  onUploadError(args: any): void {
    // console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any): void {
    // console.log('onUploadSuccess:', args);
  }

  private dropInit() {
    const vm = this;

    this.config = {
      previewTemplate: document.querySelector('#template-preview').innerHTML,
      clickable: true,
      maxFiles: 4,
      addRemoveLinks: true,
      autoQueue: false,
      dictDefaultMessage: `
      <span class="dz-button-custom">Haga clic o arrastre los archivos aquí para subirlas.</span>
      <span class="note needsclick">Sólo se pueden subir máximo 4 archivos.</span>
      `,
      dictRemoveFile: '<i class="material-icons">clear</i>',
      init() {
        const drop: any = this;

        drop.on('thumbnail', (file: any, dataUrl: string) => {
          if (file.previewElement && FileUtils.isTheFileAnImage(file)) {

            const images: any[] = file.previewElement.querySelectorAll('.dz-thumbnail-image');

            for (let i = 0; i < images.length; i++) {
              const thumbnailElement: any = images[i];
              thumbnailElement.alt = file.name;
              thumbnailElement.src = file.dataURL;
            }
          }
        });

        drop.on('addedfile', (file: File) => {
          const founded = vm.addedFiles.some((item: any) => item.name === file.name);

          if (founded) {
            alert(`El fichero <strong>${file.name}</strong> ya se encuentra agregado`);

            drop.removeFile(file);
            return;
          }

          console.log('drop addedfile', {file, previewElement: file['previewElement']});

          file['previewElement'].setAttribute('data-uuid', file['upload'].uuid);

          vm.dropzoneUtils.setthumbnailImage(file);

          vm.addedFiles.push(file);
        });

        drop.on('removedfile', (file: File) => {
          const index: number = vm.addedFiles.findIndex((item: any) => item.name === file.name);

          vm.addedFiles.splice(index, 1);

          console.log('drop removedFile', file);
        });

        drop.on('error', (file: any, message: string) => {

          console.log('drop error', file);

          if (message.includes(':filename')) {
            message = message.replace(':filename', `<strong>"${file.name}"</strong>`);
          }

          if (file.status !== STATUS_CANCELED) {
            alert(message);

            drop.removeFile(file);
          }
        });

        $(drop.element).on('click', '.dz-view-image', function() {
          const $preview = $(this).parents('.dz-image-preview');
          const uuid = $preview.attr('data-uuid');
          const file = vm.addedFiles.find((item: any) => item.upload.uuid === uuid);

          vm.openModalPreviewFile(file);
        });

        vm.displayExistingFiles(drop);
      }
    };
  }

  displayExistingFiles(drop: any): void {
    const items: any[] = this.items;

    items.forEach((item: any) => {
      const { name, dataURL, type } = item;
      // const blob: Blob = this.fileUtils.dataURLtoBlob(dataURL);
      const blob: Blob = FileUtils.dataURLtoBlob(dataURL);
      const file: File = new File([blob], name, { type });

      const uuid = uuidv5(name, '1b671a64-40d5-491e-99b0-da01ff1f3341');
      const urlImage: string = FileUtils.isTheFileAnImage(file) ? dataURL : this.dropzoneUtils.getThumbnailImage(file);

      file['status'] = 'added';
      file['accepted'] = true;
      file['upload'] = {uuid};

      drop.files.push(file);
      drop.displayExistingFile(file, urlImage);
    });
  }

  private async getDataUrlFromImage(image: string) {
    const blob = await fetch(image).then(r => r.blob());

    const dataUrl = await new Promise(resolve => {
      const reader = new FileReader();
      // reader.onload = () => resolve(reader.result);
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    return dataUrl;
  }

}
