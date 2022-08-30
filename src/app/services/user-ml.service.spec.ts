import { TestBed } from '@angular/core/testing';

import { UserMlService } from './user-ml.service';

describe('UserMlService', () => {
  let service: UserMlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
