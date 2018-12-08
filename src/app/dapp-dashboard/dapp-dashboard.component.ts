import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AddressInfoState } from '../dapp-store/address-info.state';

@Component({
  selector: 'app-dapp-dashboard',
  templateUrl: './dapp-dashboard.component.html',
  styleUrls: ['./dapp-dashboard.component.scss']
})
export class DappDashboardComponent implements OnInit {

  @Select(AddressInfoState.getAddress) address$;
  @Select(AddressInfoState.getBalance) balance$;

  constructor() { }

  ngOnInit() {
  }

}
