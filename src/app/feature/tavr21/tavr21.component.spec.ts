import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TAVR21Component } from './tavr21.component';

describe('Tavr21Component', () => {
  let component: TAVR21Component;
  let fixture: ComponentFixture<TAVR21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TAVR21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TAVR21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
