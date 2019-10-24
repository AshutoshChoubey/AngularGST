import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentAddComponent } from './indent-add.component';

describe('IndentAddComponent', () => {
  let component: IndentAddComponent;
  let fixture: ComponentFixture<IndentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
