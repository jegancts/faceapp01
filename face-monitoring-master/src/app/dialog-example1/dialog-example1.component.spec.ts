import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExample1Component } from './dialog-example1.component';

describe('DialogExample1Component', () => {
  let component: DialogExample1Component;
  let fixture: ComponentFixture<DialogExample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
