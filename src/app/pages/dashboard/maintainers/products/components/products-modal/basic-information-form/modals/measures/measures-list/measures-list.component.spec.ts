import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresListComponent } from './measures-list.component';

describe('MeasuresListComponent', () => {
  let component: MeasuresListComponent;
  let fixture: ComponentFixture<MeasuresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
