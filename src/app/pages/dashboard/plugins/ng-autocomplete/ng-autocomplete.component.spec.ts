import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAutocompleteComponent } from './ng-autocomplete.component';

describe('NgAutocompleteComponent', () => {
  let component: NgAutocompleteComponent;
  let fixture: ComponentFixture<NgAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
