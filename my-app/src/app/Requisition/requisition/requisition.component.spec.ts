import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionComponent } from './requisition.component';

describe('RequisitionComponent', () => {
  let component: RequisitionComponent;
  let fixture: ComponentFixture<RequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
