import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddComponent } from './supplier-add.component';

describe('SupplierAddComponent', () => {
  let component: SupplierAddComponent;
  let fixture: ComponentFixture<SupplierAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
