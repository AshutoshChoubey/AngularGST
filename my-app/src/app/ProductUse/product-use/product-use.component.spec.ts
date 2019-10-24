import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUseComponent } from './product-use.component';

describe('ProductUseComponent', () => {
  let component: ProductUseComponent;
  let fixture: ComponentFixture<ProductUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
