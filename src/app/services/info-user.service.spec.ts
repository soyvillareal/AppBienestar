import { TestBed } from '@angular/core/testing';

import { InfoUSerService } from './info-user.service';

describe('InfoUSerService', () => {
  let service: InfoUSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoUSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
