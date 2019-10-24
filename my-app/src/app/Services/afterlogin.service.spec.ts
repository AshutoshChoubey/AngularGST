import { TestBed } from '@angular/core/testing';

import { AfterloginService } from './afterlogin.service';

describe('AfterloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfterloginService = TestBed.get(AfterloginService);
    expect(service).toBeTruthy();
  });
});
