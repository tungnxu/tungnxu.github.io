import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TquillEditorComponent } from './tquill-editor.component';

describe('TquillEditorComponent', () => {
  let component: TquillEditorComponent;
  let fixture: ComponentFixture<TquillEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TquillEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TquillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
