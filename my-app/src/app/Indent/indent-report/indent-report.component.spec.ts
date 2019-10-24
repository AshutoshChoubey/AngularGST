import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentReportComponent } from './indent-report.component';

describe('IndentReportComponent', () => {
  let component: IndentReportComponent;
  let fixture: ComponentFixture<IndentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
