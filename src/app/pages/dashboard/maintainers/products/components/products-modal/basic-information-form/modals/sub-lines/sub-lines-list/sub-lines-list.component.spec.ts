import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLinesListComponent } from './sub-lines-list.component';

describe('SubLinesListComponent', () => {
  let component: SubLinesListComponent;
  let fixture: ComponentFixture<SubLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
