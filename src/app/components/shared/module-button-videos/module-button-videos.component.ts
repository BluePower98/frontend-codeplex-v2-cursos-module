import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// import { GlobalService } from '../../shared/global.service';
// import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
// import { MatDialog } from '@angular/material';
import { GlobalService } from '@services/global.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalVideoGuidelinesComponent } from '../modal-video-guidelines/modal-video-guidelines.component';

const FAKE_VIDEOS = [
  {
    descripcion: "Rgistro de plan, registar producto, lista de precios y otros",
    idmenu: 60,
    idmodulo: 2,
    url: "https://www.youtube.com/embed/VFNxFIOI_bI"
  },
  {
    descripcion: "Registro/Importación de productos y ventas",
    idmenu: 60,
    idmodulo: 2,
    url: "https://www.youtube.com/embed/CGVTF1V9zTo"
  }
];

@Component({
  selector: 'app-module-button-videos',
  templateUrl: './module-button-videos.component.html',
  styleUrls: ['./module-button-videos.component.scss']
})
export class ModuleButtonVideosComponent implements OnInit, OnDestroy {

  @Input() title: string;

  videos: any[] = [];
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private globalService: GlobalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    /* this.globalService.getCurrentVideosByMenu()
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(value => {
          console.log(value);
          this.videos = value;
        }); */


      this.videos = FAKE_VIDEOS;
  }

  openModal(): void {
    const width: string = this.videos.length > 1 ? '1200px' : '800px';

    const dialogConfig = this.dialog.open(ModalVideoGuidelinesComponent, {
        data: {
            videos: this.videos
        },
        width,
        minHeight: '400px',
        panelClass: ['fullscreen-mat-dialog'],
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });
  }

  ngOnDestroy() {
    /* this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete(); */
  }
}
