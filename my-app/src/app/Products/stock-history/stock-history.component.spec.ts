import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoryComponent } from './stock-history.component';

describe('StockHistoryComponent', () => {
  let component: StockHistoryComponent;
  let fixture: ComponentFixture<StockHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
