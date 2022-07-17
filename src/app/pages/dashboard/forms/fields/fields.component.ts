import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'forms-fields',
    templateUrl: './fields.component.html',
    styleUrls: [
        './fields.components.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class FormsFieldsComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            postal_code: ['', [Validators.required]],
        });
    }

    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        console.log('save', this.form.value);
    }

    reset() {
        this.form.reset();
    }

    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }
}
