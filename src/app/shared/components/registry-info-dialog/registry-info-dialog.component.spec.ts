import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryInfoDialogComponent } from './registry-info-dialog.component';

describe('RegistryInfoDialogComponent', () => {
  let component: RegistryInfoDialogComponent;
  let fixture: ComponentFixture<RegistryInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
