import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSellingPricesTableComponent } from './import-selling-prices-table.component';

describe('ImportSellingPricesTableComponent', () => {
  let component: ImportSellingPricesTableComponent;
  let fixture: ComponentFixture<ImportSellingPricesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSellingPricesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSellingPricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
