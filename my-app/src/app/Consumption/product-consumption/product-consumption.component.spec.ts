import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConsumptionComponent } from './product-consumption.component';

describe('ProductConsumptionComponent', () => {
  let component: ProductConsumptionComponent;
  let fixture: ComponentFixture<ProductConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
