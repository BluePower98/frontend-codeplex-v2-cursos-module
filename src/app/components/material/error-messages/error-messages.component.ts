import { Component, Input, OnInit, OnChanges } from '@angular/core';

const DEFAULT_ERRORS = {
  required: () => 'Campo requerido.',
  email: () => 'El campo es un email inválido.',
  minlength: ({ requiredLength, actualLength }) => `El campo debería contener mínimo ${requiredLength} caracteres.`
}

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit, OnChanges {
  @Input() errors: any;
  @Input() errorMessages: any;

  message: string;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.showErrorMessage();
  }

  private showErrorMessage() {
    if (!this.errors) {
      return;
    }

    const firstKey = Object.keys(this.errors)[0];

    if (this.errorMessages?.hasOwnProperty(firstKey)) {
      this.message = this.errorMessages[firstKey];
    } else {
      this.message = DEFAULT_ERRORS[firstKey](this.errors[firstKey]);
    }
  }
  /* private showErrorMessage(errors: any) {
    if (!errors) {
      return;
    }

    const firstKey = Object.keys(errors)[0];

    if (this.errorMessages?.hasOwnProperty(firstKey)) {
      this.message = this.errorMessages[firstKey];
    } else {
      this.message = DEFAULT_ERRORS[firstKey](errors[firstKey]);
    }
  } */
}
