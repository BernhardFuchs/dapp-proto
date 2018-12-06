import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DappInfoButtonComponent } from './dapp-info-button/dapp-info-button.component';
import { DappDashboardComponent } from './dapp-dashboard/dapp-dashboard.component';
import { DappHeaderComponent } from './dapp-header/dapp-header.component';
import { DappFooterComponent } from './dapp-footer/dapp-footer.component';
import { GuiModule } from './gui/gui.module';
import { DappAddressFieldComponent } from './dapp-address-field/dapp-address-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressInfoService } from './services/address-info.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DappInfoButtonComponent,
    DappDashboardComponent,
    DappHeaderComponent,
    DappFooterComponent,
    DappAddressFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuiModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
