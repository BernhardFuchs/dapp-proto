import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { GuiModule } from '../gui/gui.module';
import { SharedModule } from '../shared/shared.module';
import { DappDashboardComponent } from './dapp-dashboard.component';
import { TokenTableComponent } from './token-table/token-table.component';

const routes = [
  {
    path: '',
    component: DappDashboardComponent
  }
];

@NgModule({
  declarations: [
    TokenTableComponent,
    DappDashboardComponent
  ],
  entryComponents: [
    DappDashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    GuiModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DappDashboardModule {}
