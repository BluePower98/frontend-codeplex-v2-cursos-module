import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dropzone-modal-preview',
  templateUrl: './dropzone-modal-preview.component.html',
  styleUrls: ['./dropzone-modal-preview.component.scss']
})
export class DropzoneModalPreviewComponent implements OnInit {

  file: File;
  dataUrl: any;
  isImage: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.file = this.data.file;
    this.isImage = this.data.isImage;

    console.log({
      file: this.file,
      isImage: this.isImage,

    });

    this.readAsDataURL();
  }

  private readAsDataURL(): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.dataUrl = reader.result;

      console.log('onloadend', {dataUrl: this.dataUrl});
    };

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

}
