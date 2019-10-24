import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeIndentComponent } from './make-indent.component';

describe('MakeIndentComponent', () => {
  let component: MakeIndentComponent;
  let fixture: ComponentFixture<MakeIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
