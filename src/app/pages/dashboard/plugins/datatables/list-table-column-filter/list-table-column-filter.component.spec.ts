import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableColumnFilterComponent } from './list-table-column-filter.component';

describe('ListTableColumnFilterComponent', () => {
  let component: ListTableColumnFilterComponent;
  let fixture: ComponentFixture<ListTableColumnFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTableColumnFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTableColumnFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
