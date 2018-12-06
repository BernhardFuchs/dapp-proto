import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappFooterComponent } from './dapp-footer.component';

describe('DappFooterComponent', () => {
  let component: DappFooterComponent;
  let fixture: ComponentFixture<DappFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
