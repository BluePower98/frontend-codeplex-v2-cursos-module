import { TestBed } from '@angular/core/testing';

import { SubLineService } from './sub-line.service';

describe('SubLineService', () => {
  let service: SubLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
