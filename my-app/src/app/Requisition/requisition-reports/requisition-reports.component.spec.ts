import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionReportsComponent } from './requisition-reports.component';

describe('RequisitionReportsComponent', () => {
  let component: RequisitionReportsComponent;
  let fixture: ComponentFixture<RequisitionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
