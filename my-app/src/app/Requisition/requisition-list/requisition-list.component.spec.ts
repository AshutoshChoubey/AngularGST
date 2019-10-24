import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionListComponent } from './requisition-list.component';

describe('RequisitionListComponent', () => {
  let component: RequisitionListComponent;
  let fixture: ComponentFixture<RequisitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
