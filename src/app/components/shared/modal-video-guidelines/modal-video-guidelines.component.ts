import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-video-guidelines',
  templateUrl: './modal-video-guidelines.component.html',
  styleUrls: ['./modal-video-guidelines.component.scss']
})
export class ModalVideoGuidelinesComponent implements OnInit {
  searchText: FormControl = new FormControl();
  videos: any[] = [];
  filteredVideos: any[] = [];
  videoSelected: any;
  currentSelected: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const { videos } = this.data;

    this.videos = videos.map((video: any, index: number) => this.transformVideoData(video, index));
    this.filteredVideos = this.videos;

    this.changeVideo(1);

    this.searchText.valueChanges.subscribe(value => {
      console.log({value});
      this.searchVideos(value);
    });
  }

  changeVideo(id: number): void {
    this.currentSelected = id;

    this.videoSelected = this.videos.find(video => video.id === id);
  }

  transformVideoData(video: any, index: number): any {
    return {
      id: index + 1,
      video: video.url,
      alt: video.descripcion,
      title: video.descripcion,
    };
  }

  searchVideos(term: string) {
    this.filteredVideos = this.videos.filter(video => {
      return (video['title'].toLowerCase()).indexOf(term.toLowerCase()) !== -1;
    });
  }
}
