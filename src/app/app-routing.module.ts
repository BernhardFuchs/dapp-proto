import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DappHomeComponent } from './dapp-home/dapp-home.component';
import { DappDashboardComponent } from './dapp-dashboard/dapp-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DappHomeComponent
  },
  {
    path: 'dashboard',
    component: DappDashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
