import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasuresListComponent } from './measures-list/measures-list.component';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit {

  @ViewChild(MeasuresListComponent, {static: true}) measuresListComponent: MeasuresListComponent

  constructor(
    private dialogRef: MatDialogRef<MeasuresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close({ refreshData: this.measuresListComponent.refreshData });
  }

}
