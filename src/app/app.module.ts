import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DappDashboardComponent } from './dapp-dashboard/dapp-dashboard.component';
import { GuiModule } from './gui/gui.module';
import { DappAddressFieldComponent } from './dapp-address-field/dapp-address-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DappStoreModule } from './dapp-store';
import { DappHeaderComponent } from './dapp-header/dapp-header.component';

@NgModule({
  declarations: [
    AppComponent,
    DappDashboardComponent,
    DappAddressFieldComponent,
    DappHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DappStoreModule,
    GuiModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
