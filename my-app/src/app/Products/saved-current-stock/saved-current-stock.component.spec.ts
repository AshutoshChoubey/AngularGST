import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCurrentStockComponent } from './saved-current-stock.component';

describe('SavedCurrentStockComponent', () => {
  let component: SavedCurrentStockComponent;
  let fixture: ComponentFixture<SavedCurrentStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCurrentStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCurrentStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
