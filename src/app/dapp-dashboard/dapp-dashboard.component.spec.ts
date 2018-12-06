import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappDashboardComponent } from './dapp-dashboard.component';

describe('DappDashboardComponent', () => {
  let component: DappDashboardComponent;
  let fixture: ComponentFixture<DappDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
