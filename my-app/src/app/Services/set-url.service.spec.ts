import { TestBed } from '@angular/core/testing';

import { SetUrlService } from './set-url.service';

describe('SetUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetUrlService = TestBed.get(SetUrlService);
    expect(service).toBeTruthy();
  });
});
