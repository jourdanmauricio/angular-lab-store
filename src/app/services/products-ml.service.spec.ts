import { TestBed } from '@angular/core/testing';

import { ProductsMlService } from './products-ml.service';

describe('ProductsMlService', () => {
  let service: ProductsMlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
