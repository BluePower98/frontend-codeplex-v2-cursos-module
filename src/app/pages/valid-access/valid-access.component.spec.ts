import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAccessComponent } from './valid-access.component';

describe('ValidAccessComponent', () => {
  let component: ValidAccessComponent;
  let fixture: ComponentFixture<ValidAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
