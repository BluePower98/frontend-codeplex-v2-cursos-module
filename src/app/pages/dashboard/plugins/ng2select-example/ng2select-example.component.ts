import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ng2select-example',
  templateUrl: './ng2select-example.component.html',
  styleUrls: ['./ng2select-example.component.scss']
})
export class Ng2selectExampleComponent implements OnInit {

  form: FormGroup;
  selectedCar: number;
  cars: any[] = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get f(): {[key: string]: FormControl} {
    return this.form.controls as {[key: string]: FormControl};
  }

  onChange($event: any) {
    console.log('onChange', $event);
  }

  private buildForm() {
    this.form = this.fb.group({
      cardId: [0, [Validators.required]]
    });
  }

}
