import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostPanelComponent } from './edit-post-panel.component';

describe('EditPostPanelComponent', () => {
  let component: EditPostPanelComponent;
  let fixture: ComponentFixture<EditPostPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
