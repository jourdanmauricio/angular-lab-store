import { TestBed } from '@angular/core/testing';

import { AuthMlService } from './auth-ml.service';

describe('AuthMlService', () => {
  let service: AuthMlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
