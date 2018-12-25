import { NgModule } from '@angular/core';
import { DappDashboardComponent } from './dapp-dashboard.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'dashboard',
    component: DappDashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    DappDashboardRoutingModule
  ]
})
export class DappDashboardRoutingModule {}
