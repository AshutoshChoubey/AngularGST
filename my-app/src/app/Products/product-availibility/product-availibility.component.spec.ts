import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAvailibilityComponent } from './product-availibility.component';

describe('ProductAvailibilityComponent', () => {
  let component: ProductAvailibilityComponent;
  let fixture: ComponentFixture<ProductAvailibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAvailibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAvailibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
