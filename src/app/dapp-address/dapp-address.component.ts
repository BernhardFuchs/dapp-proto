import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { AddressInfoFetchAction } from '../dapp-store/address-info.actions';

@Component({
  selector: 'app-dapp-address',
  templateUrl: './dapp-address.component.html',
  styleUrls: ['./dapp-address.component.scss']
})
export class DappAddressComponent implements OnInit {

  constructor(private store$: Store) { }

  addressForm = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.addressForm.hasError('required') ? 'You must enter a value' :
            '';
  }

  public fetchAddress() {
    console.log('Fetching for Address: ', this.addressForm.value);
    this.store$.dispatch(new AddressInfoFetchAction(this.addressForm.value));
  }

}
