import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatInputComponent } from './custom-mat-input.component';

describe('CustomMatInputComponent', () => {
  let component: CustomMatInputComponent;
  let fixture: ComponentFixture<CustomMatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
