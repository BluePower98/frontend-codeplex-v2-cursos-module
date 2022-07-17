import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductsTableComponent } from './import-products-table.component';

describe('ImportProductsTableComponent', () => {
  let component: ImportProductsTableComponent;
  let fixture: ComponentFixture<ImportProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportProductsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
