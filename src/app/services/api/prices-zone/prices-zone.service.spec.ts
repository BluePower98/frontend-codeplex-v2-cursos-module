import { TestBed } from '@angular/core/testing';

import { PricesZoneService } from './prices-zone.service';

describe('PricesZoneService', () => {
  let service: PricesZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricesZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
