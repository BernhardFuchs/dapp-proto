import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { BalanceInfoState } from '../dapp-store/balance-info.state';
import { AddressInfoState } from '../dapp-store/address-info.state';
import { Token } from '../dapp-store/address-info.state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dapp-dashboard',
  templateUrl: './dapp-dashboard.component.html',
  styleUrls: ['./dapp-dashboard.component.scss']
})
export class DappDashboardComponent implements OnInit {

  @Select(BalanceInfoState.getAddress) address$: Observable<string>;
  @Select(BalanceInfoState.getBalance) balance$: Observable<string>;
  @Select(AddressInfoState.getTokens) tokens$: Observable<Token[]>;
  tokens: Token[];

  constructor() { }

  ngOnInit() {
    // this.tokens$.subscribe((tokens: Token[]) => this.tokens = tokens);
  }

}
