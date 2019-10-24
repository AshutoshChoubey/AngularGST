import { TestBed } from '@angular/core/testing';

import { IndentService } from './indent.service';

describe('IndentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndentService = TestBed.get(IndentService);
    expect(service).toBeTruthy();
  });
});
