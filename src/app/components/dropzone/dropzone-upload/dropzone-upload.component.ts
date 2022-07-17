import { Component, Input, NgZone, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { DropzoneUtils } from '@utils/dropzone.util';
import { FileUtils } from '@utils/file.util';

import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { DropzoneModalPreviewComponent } from '../dropzone-modal-preview/dropzone-modal-preview.component';

declare var $: any;

const STATUS_CANCELED = 'canceled';

@Component({
  selector: 'app-dropzone-upload',
  templateUrl: './dropzone-upload.component.html',
  styleUrls: ['./dropzone-upload.component.scss']
})
export class DropzoneUploadComponent implements OnInit, AfterViewInit {

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @Input() maxFiles: number;
  @Input() maxFilesize: number;
  @Input() items: any[] = [];
  @Output() onUpdateFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

  addedFiles: File[] = [];
  config: DropzoneConfigInterface = {};

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private dropzoneUtils: DropzoneUtils,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
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
        minHeight,
        autoFocus: false
      });
    });
  }

  private dropInit(): void {
    const self = this;

    this.config = {
      previewTemplate: document.querySelector('#template-preview').innerHTML,
      clickable: true,
      maxFiles: self.maxFiles,
      maxFilesize: self.maxFilesize,
      dictMaxFilesExceeded: 'Sólo puedes subir un máximo de {{maxFiles}} archivos.',
      dictFileTooBig: `El archivo :filename es muy grande ({{filesize}}MiB). El tamaño máximo es: {{maxFilesize}}MiB.`,
      addRemoveLinks: true,
      autoQueue: false,
      dictDefaultMessage: `
      <span class="dz-button-custom">
        Haga clic o arrastre las imágenes aquí para subirlas.
      </span>
      <span class="note needsclick">
        Sólo se pueden subir máximo 4 imágenes.
      </span>
      `,
      dictRemoveFile: '<i class="material-icons">clear</i>',
      init() {
        const drop: any = this;

        drop.on('thumbnail', (file: any, dataUrl: string) => {
          if (file.previewElement) {
            const images: any[] = file.previewElement.querySelectorAll('.dz-thumbnail-image');

            for (let i = 0; i < images.length; i++) {
              const image: any = images[i];
              image.alt = file.name;
              image.src = file.dataURL;
            }
          }
        });

        drop.on('removedfile', (file: File) => {
          const index: number = self.addedFiles.findIndex((item: any) => item.name === file.name);

          self.addedFiles.splice(index, 1);

          self.onUpdateFiles.emit(self.addedFiles);
        });

        drop.on('addedfile', (file: File) => {
          const founded = self.addedFiles.some((item: any) => item.name === file.name);

          if (founded) {
            self.toastNotificationService.error(`El fichero <strong>${file.name}</strong> ya se encuentra agregado`);

            drop.removeFile(file);
            return;
          }

          file['previewElement'].setAttribute('data-uuid', file['upload'].uuid);

          self.dropzoneUtils.setthumbnailImage(file);

          self.addedFiles.push(file);

          self.onUpdateFiles.emit(self.addedFiles);
        });

        drop.on('error', (file: any, message: string) => {
          if (message.includes(':filename')) {
            message = message.replace(':filename', `<strong>"${file.name}"</strong>`);
          }

          if (file.status !== STATUS_CANCELED) {
            self.toastNotificationService.error(message);

            drop.removeFile(file);
          }
        });

        $(drop.element).on('click', '.dz-view-image', function () {
          const $preview = $(this).parents('.dz-image-preview');
          const uuid = $preview.attr('data-uuid');
          const file = self.addedFiles.find((item: any) => item.upload.uuid === uuid);

          self.openModalPreviewFile(file);
        });

        self.displayExistingFiles(drop);
      }
    };
  }

  private displayExistingFiles(drop: any): void {
    this.items.forEach((item: any) => {
      const { name, dataURL, type } = item;

      const blob: Blob = FileUtils.dataURLtoBlob(dataURL);
      const file: File = new File([blob], name, { type });

      const uuid = (new Date().getTime()).toString();

      file['status'] = 'added';
      file['accepted'] = true;
      file['upload'] = { uuid };

      drop.files.push(file);
      drop.displayExistingFile(file, dataURL);
    });
  }
}
