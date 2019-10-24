import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPurchaseComponent } from './search-purchase.component';

describe('SearchPurchaseComponent', () => {
  let component: SearchPurchaseComponent;
  let fixture: ComponentFixture<SearchPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
