import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPricesZoneComponent } from './products-prices-zone.component';

describe('ProductsPricesZoneComponent', () => {
  let component: ProductsPricesZoneComponent;
  let fixture: ComponentFixture<ProductsPricesZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPricesZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPricesZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
