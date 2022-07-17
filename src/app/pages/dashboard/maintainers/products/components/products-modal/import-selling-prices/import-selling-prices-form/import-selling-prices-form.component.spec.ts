import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSellingPricesFormComponent } from './import-selling-prices-form.component';

describe('ImportSellingPricesFormComponent', () => {
  let component: ImportSellingPricesFormComponent;
  let fixture: ComponentFixture<ImportSellingPricesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSellingPricesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSellingPricesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
