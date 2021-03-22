import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutrequistionComponent } from './logoutrequistion.component';

describe('LogoutrequistionComponent', () => {
  let component: LogoutrequistionComponent;
  let fixture: ComponentFixture<LogoutrequistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutrequistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutrequistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
