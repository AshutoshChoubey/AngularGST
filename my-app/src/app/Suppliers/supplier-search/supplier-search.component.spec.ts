import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSearchComponent } from './supplier-search.component';

describe('SupplierSearchComponent', () => {
  let component: SupplierSearchComponent;
  let fixture: ComponentFixture<SupplierSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
