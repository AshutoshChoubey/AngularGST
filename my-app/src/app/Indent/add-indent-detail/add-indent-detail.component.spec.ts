import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndentDetailComponent } from './add-indent-detail.component';

describe('AddIndentDetailComponent', () => {
  let component: AddIndentDetailComponent;
  let fixture: ComponentFixture<AddIndentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
