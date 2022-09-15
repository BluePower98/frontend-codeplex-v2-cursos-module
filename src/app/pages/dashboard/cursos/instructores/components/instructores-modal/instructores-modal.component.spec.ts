import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoresModalComponent } from './instructores-modal.component';

describe('InstructoresModalComponent', () => {
  let component: InstructoresModalComponent;
  let fixture: ComponentFixture<InstructoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructoresModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
