import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPurchaseComponent } from './return-purchase.component';

describe('ReturnPurchaseComponent', () => {
  let component: ReturnPurchaseComponent;
  let fixture: ComponentFixture<ReturnPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
