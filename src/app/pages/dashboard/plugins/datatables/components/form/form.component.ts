import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastNotificationService } from '@services/ui/toast-notification.service';

import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';

@Component({
  selector: 'app-dt-01-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formFieldHelpers: string[] = [''];

  form: FormGroup;
  title: string;
  edit: boolean;

  errorMatcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    const { title, edit } = this.data;

    this.title = title;
    this.edit = edit;

    this.buildForm();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const message: string = !this.edit ? 'Registro creado correctamente.' : 'Registro actualizado correctamente.';

    this.toastNotificationService.success(message);

    this.dialogRef.close({resetPaging: this.edit});
  }

  private buildForm(): void {
    const { data } = this.data;

    console.log('buildForm', data);

    this.form = this.fb.group({
      first_name: [data?.firstName, [Validators.required]],
      last_name: [data?.lastName, [Validators.required]],
    });
  }
}
