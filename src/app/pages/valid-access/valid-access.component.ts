import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-valid-access',
  templateUrl: './valid-access.component.html',
  styleUrls: ['./valid-access.component.scss']
})
export class ValidAccessComponent implements OnInit {

  @ViewChild('validAccessNgForm') validAccessNgForm: NgForm;

  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      token: ['', [Validators.required]]
    });
  }

  validate(): void {
    this.signIn();
  }

  signIn(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();

    const { token } = this.form.value;

    this.authService.validateToken(token)
      .pipe(
        finalize(() => {
           this.form.enable();
           this.validAccessNgForm.resetForm();
        })
      )
      .subscribe(
        () => {
          const redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';
          this.router.navigateByUrl(redirectURL);
        },
        (err: HttpErrorResponse) => {
          this.sweetAlertService.error(err.error?.message || 'Ocurrió un error inesperado al validar el token.');
        }
      );
  }

}
