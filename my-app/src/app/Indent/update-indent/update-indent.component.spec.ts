import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndentComponent } from './update-indent.component';

describe('UpdateIndentComponent', () => {
  let component: UpdateIndentComponent;
  let fixture: ComponentFixture<UpdateIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
