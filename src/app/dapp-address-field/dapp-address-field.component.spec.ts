import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappAddressFieldComponent } from './dapp-address-field.component';

describe('DappAddressFieldComponent', () => {
  let component: DappAddressFieldComponent;
  let fixture: ComponentFixture<DappAddressFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappAddressFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappAddressFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
