import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertedProductComponent } from './inserted-product.component';

describe('InsertedProductComponent', () => {
  let component: InsertedProductComponent;
  let fixture: ComponentFixture<InsertedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
