import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUseSearchComponent } from './product-use-search.component';

describe('ProductUseSearchComponent', () => {
  let component: ProductUseSearchComponent;
  let fixture: ComponentFixture<ProductUseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
