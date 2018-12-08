import { Injectable, Inject } from '@angular/core';
import { WEB3 } from '../core';
/* typings are a commonjs module and these cannot be imported to ES6 target project by default
   following options must be applied to tsconfig:
   "esModuleInterop": true,
   "allowSyntheticDefaultImports": true,
   For more Info see:
   https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
   #support-for-import-d-from-cjs-form-commonjs-modules-with---esmoduleinterop
*/

@Injectable()
export class AddressInfoService {

  constructor(@Inject(WEB3) private web3) { }

  public async fetchBalance(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(address.trim(), (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
