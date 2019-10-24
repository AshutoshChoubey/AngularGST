import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivideTwoScreenComponent } from './divide-two-screen.component';

describe('DivideTwoScreenComponent', () => {
  let component: DivideTwoScreenComponent;
  let fixture: ComponentFixture<DivideTwoScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivideTwoScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivideTwoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
