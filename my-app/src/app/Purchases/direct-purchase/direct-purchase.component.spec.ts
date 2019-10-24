import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectPurchaseComponent } from './direct-purchase.component';

describe('DirectPurchaseComponent', () => {
  let component: DirectPurchaseComponent;
  let fixture: ComponentFixture<DirectPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
