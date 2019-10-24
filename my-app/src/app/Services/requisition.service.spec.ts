import { TestBed } from '@angular/core/testing';

import { RequisitionService } from './requisition.service';

describe('RequisitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequisitionService = TestBed.get(RequisitionService);
    expect(service).toBeTruthy();
  });
});
