import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSellingPricesComponent } from './import-selling-prices.component';

describe('ImportSellingPricesComponent', () => {
  let component: ImportSellingPricesComponent;
  let fixture: ComponentFixture<ImportSellingPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSellingPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSellingPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
