import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentListComponent } from './indent-list.component';

describe('IndentListComponent', () => {
  let component: IndentListComponent;
  let fixture: ComponentFixture<IndentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
