import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AddressInfoService } from '@services/address-info.service';

@Component({
  selector: 'app-dapp-address-field',
  templateUrl: './dapp-address-field.component.html',
  styleUrls: ['./dapp-address-field.component.scss']
})
export class DappAddressFieldComponent implements OnInit {

  constructor(private ethereumService: AddressInfoService) { }

  addressForm = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.addressForm.hasError('required') ? 'You must enter a value' :
            '';
  }

  public fetchAddress() {
    console.log('Fetching for Address: ', this.addressForm.value);
    this.ethereumService.fetchAddress(this.addressForm.value);
  }

}
