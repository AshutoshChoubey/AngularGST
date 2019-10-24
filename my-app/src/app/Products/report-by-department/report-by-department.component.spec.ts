import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByDepartmentComponent } from './report-by-department.component';

describe('ReportByDepartmentComponent', () => {
  let component: ReportByDepartmentComponent;
  let fixture: ComponentFixture<ReportByDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
