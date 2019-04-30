import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { STS29Component } from './sts29.component';

describe('STS29Component', () => {
  let component: STS29Component;
  let fixture: ComponentFixture<STS29Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STS29Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(STS29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
