import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuiModule } from './gui/gui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DappStoreModule } from './dapp-store';
import { DappHeaderComponent } from './dapp-header/dapp-header.component';
import { DappDashboardComponent } from './dapp-dashboard/dapp-dashboard.component';
import { DappAddressComponent } from './dapp-address/dapp-address.component';
import { EtherPipe } from './dapp-dashboard/ether.pipe';
import { TokenTableComponent } from './dapp-dashboard/token-table/token-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DappHeaderComponent,
    DappAddressComponent,
    DappDashboardComponent,
    EtherPipe,
    TokenTableComponent
  ],
  imports: [
    BrowserModule,
    DappStoreModule,
    AppRoutingModule,
    GuiModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
