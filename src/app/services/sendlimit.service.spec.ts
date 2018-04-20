import { TestBed, inject } from '@angular/core/testing';

import { SendLimitService } from './send-limit.service';

describe('SendLimitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendLimitService]
    });
  });

  it('should be created', inject([SendLimitService], (service: SendLimitService) => {
    expect(service).toBeTruthy();
  }));
});
