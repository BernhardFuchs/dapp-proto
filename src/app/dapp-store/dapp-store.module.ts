import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';
import { ChainInfoState } from './chain-info.state';
import { ChainInfoService, AddressInfoService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { AddressInfoState } from './address-info.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ChainInfoState,
      AddressInfoState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule
  ],
  providers: [
    ChainInfoService,
    AddressInfoService
  ],
})
export class DappStoreModule {}
