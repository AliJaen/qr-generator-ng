import { TestBed } from '@angular/core/testing';

import { AtNotificationService } from './at-notification.service';

describe('AtNotificationService', () => {
  let service: AtNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
