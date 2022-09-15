import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoresListComponent } from './instructores-list.component';

describe('InstructoresListComponent', () => {
  let component: InstructoresListComponent;
  let fixture: ComponentFixture<InstructoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
