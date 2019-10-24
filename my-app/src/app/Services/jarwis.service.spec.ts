import { TestBed } from '@angular/core/testing';

import { JarwisService } from './jarwis.service';

describe('JarwisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JarwisService = TestBed.get(JarwisService);
    expect(service).toBeTruthy();
  });
});
