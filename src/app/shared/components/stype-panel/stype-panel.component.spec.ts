import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StypePanelComponent } from './stype-panel.component';

describe('StypePanelComponent', () => {
  let component: StypePanelComponent;
  let fixture: ComponentFixture<StypePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StypePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
