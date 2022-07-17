import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLinesComponent } from './sub-lines.component';

describe('SubLinesComponent', () => {
  let component: SubLinesComponent;
  let fixture: ComponentFixture<SubLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
