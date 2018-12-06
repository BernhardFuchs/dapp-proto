import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappInfoButtonComponent } from './dapp-info-button.component';

describe('DappInfoButtonComponent', () => {
  let component: DappInfoButtonComponent;
  let fixture: ComponentFixture<DappInfoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappInfoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappInfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
