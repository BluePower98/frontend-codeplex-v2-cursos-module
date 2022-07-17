import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LinesListComponent } from './lines-list/lines-list.component';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {

  @ViewChild(LinesListComponent, {static: true}) linesListComponent: LinesListComponent;

  constructor(
    private dialogRef: MatDialogRef<LinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }

  closeModal(): void {
    this.dialogRef.close({ refreshData: this.linesListComponent.refreshData });
  }
}
