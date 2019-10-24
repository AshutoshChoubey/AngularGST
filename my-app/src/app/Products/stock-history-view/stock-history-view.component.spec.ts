import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoryViewComponent } from './stock-history-view.component';

describe('StockHistoryViewComponent', () => {
  let component: StockHistoryViewComponent;
  let fixture: ComponentFixture<StockHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
