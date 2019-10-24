import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionAddComponent } from './requisition-add.component';

describe('RequisitionAddComponent', () => {
  let component: RequisitionAddComponent;
  let fixture: ComponentFixture<RequisitionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
