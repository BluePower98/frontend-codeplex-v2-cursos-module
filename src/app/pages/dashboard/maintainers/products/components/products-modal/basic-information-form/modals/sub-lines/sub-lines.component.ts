import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubLinesListComponent } from './sub-lines-list/sub-lines-list.component';

@Component({
  selector: 'app-sub-lines',
  templateUrl: './sub-lines.component.html',
  styleUrls: ['./sub-lines.component.scss']
})
export class SubLinesComponent implements OnInit {

  @ViewChild(SubLinesListComponent, {static: true}) subLinesListComponent: SubLinesListComponent;

  constructor(
    private dialogRef: MatDialogRef<SubLinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ refreshData: this.subLinesListComponent.refreshData });
  }

}
