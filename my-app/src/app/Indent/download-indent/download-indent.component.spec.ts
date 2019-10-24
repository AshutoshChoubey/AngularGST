import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadIndentComponent } from './download-indent.component';

describe('DownloadIndentComponent', () => {
  let component: DownloadIndentComponent;
  let fixture: ComponentFixture<DownloadIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
