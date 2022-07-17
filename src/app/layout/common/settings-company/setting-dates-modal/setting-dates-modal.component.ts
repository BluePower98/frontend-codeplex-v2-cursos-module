import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-setting-dates-modal',
  templateUrl: './setting-dates-modal.component.html',
  styleUrls: ['./setting-dates-modal.component.scss']
})
export class SettingDatesModalComponent implements OnInit {

  form: FormGroup;
  errorMatcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  months: Array<any> = [];
  years: Array<any> = [];
  selectedMonth: any;
  selectedYear: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingDatesModalComponent>,
  ) { }

  ngOnInit(): void {
    const { years, months, selectedYear, selectedMonth } = this.data;

    this.years = years;
    this.months = months;
    this.selectedMonth = selectedMonth;
    this.selectedYear = selectedYear;

    this.buildForm();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  onChangeMonth($event: any) {
    this.selectedMonth = $event;
  }

  onChangeYear($event: any) {
    this.selectedYear = $event;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      selectedYear: this.selectedYear,
      selectedMonth: this.selectedMonth
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      month: [this.selectedMonth?.idmes, Validators.required],
      year: [this.selectedYear?.idaniopro, Validators.required],
    })
  }

}
