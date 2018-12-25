import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DappDashboardComponent } from './dapp-dashboard.component';
import { TokenTableComponent } from './token-table/token-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { GuiModule } from '../gui/gui.module';
import { DappDashboardRoutingModule } from './dapp-dashboard.routing.module';

@NgModule({
  declarations: [
    TokenTableComponent,
    DappDashboardComponent
  ],
  entryComponents: [
    DappDashboardComponent
  ],
  imports: [
    DappDashboardRoutingModule,
    CommonModule,
    SharedModule,
    GuiModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DappDashboardModule {}
