import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WEB3 } from '../core/web3.token';
/* typings are a commonjs module and these cannot be imported to ES6 target project by default
   following options must be applied to tsconfig:
   "esModuleInterop": true,
   "allowSyntheticDefaultImports": true,
   For more Info see:
   https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
   #support-for-import-d-from-cjs-form-commonjs-modules-with---esmoduleinterop
*/

@Injectable({
  providedIn: 'root'
})
export class AddressInfoService {

  constructor(@Inject(WEB3) private web3) { }

  public fetchAddress(address: string) {
    console.log('####Adresse:', address);
    this.web3.eth.getBalance(address.trim(),
    (err, wei) => { console.log(this.web3.utils.fromWei(wei, 'ether')); });
  }

  public getInfo() {
    const payload = '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}';
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    // this.httpClient.post(this.url, payload, {headers})
    // .subscribe(response => console.log(response));
  }
}
