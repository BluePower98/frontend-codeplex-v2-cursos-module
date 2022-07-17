import { Component, Input, OnInit, Optional, Self, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '@directives/MyErrorStateMatcher';
import { Subscription } from 'rxjs';

/**
 * CUSTOM ERRORS - PREDEFINED MESSAGES
 * https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5
 * 
 * MARK AS TOUCHED CUSTOM CONTROL
 * https://stackoverflow.com/questions/44730711/how-do-i-know-when-custom-form-control-is-marked-as-pristine-in-angular  
 * 
 * 
 */
const DEFAULT_ERRORS = {
  required: () => 'Campo requerido.',
  email: () => 'El campo es un email inválido.',
  minlength: ({ requiredLength, actualLength }) => `El campo debería contener mínimo ${requiredLength} caracteres.`
}


@Component({
  selector: 'app-custom-mat-input',
  templateUrl: './custom-mat-input.component.html',
  styleUrls: ['./custom-mat-input.component.scss']
})
export class CustomMatInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() label: string = '';
  @Input() className: string = 'w-full';
  @Input() appearance: string = 'outline';
  @Input() readonly = false

  control: FormControl = new FormControl('');
  errorMatcher = new MyErrorStateMatcher();
  value: string;
  isDisabled: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  errorMessage: string;

  private subscription$: Subscription;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const validators = this.ngControl.control.validator;

    this.control.setValidators(validators ? validators : null);
    this.control.updateValueAndValidity();

    this.subscription$ = this.control.valueChanges.subscribe(value => this.setInputValue(value));

    this.settingEvents();

    this.checkError();
  }

  setInputValue(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
    this.checkError();
  }


  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }

    this.control.patchValue(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private checkError(): void {
    const { errors } = this.control;

    if (!errors) {
      return;
    }

    const firstKey = Object.keys(errors)[0];

    this.errorMessage = DEFAULT_ERRORS[firstKey](errors[firstKey]);
  }


  private settingEvents(): void {
    const resetFn = this.ngControl.control.reset;
    const markAsTouchedFn = this.ngControl.control.markAsTouched;

    const self = this;
    
    this.ngControl.control.markAsTouched = function () {
      markAsTouchedFn.apply(this, arguments);

      if (self.control.touched) {
        return;
      }
      if (self.ngControl.control.touched) {
        self.control.markAsTouched();
      }
    }

    this.ngControl.control.reset = function() {
      resetFn.apply(this, arguments);

      self.control.reset();

      if (self.control.touched) {
        self.control.markAsUntouched();
      }
    }
  }

}
