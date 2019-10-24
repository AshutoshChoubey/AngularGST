import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequisitionComponent } from './update-requisition.component';

describe('UpdateRequisitionComponent', () => {
  let component: UpdateRequisitionComponent;
  let fixture: ComponentFixture<UpdateRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
