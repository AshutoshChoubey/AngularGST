import { TestBed } from '@angular/core/testing';

import { DepartmentServiceService } from './department-service.service';

describe('DepartmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentServiceService = TestBed.get(DepartmentServiceService);
    expect(service).toBeTruthy();
  });
});
