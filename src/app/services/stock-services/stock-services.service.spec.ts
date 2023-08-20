import { TestBed } from '@angular/core/testing';

import { StockServicesService } from './stock-services.service';

describe('StockServicesService', () => {
  let service: StockServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
