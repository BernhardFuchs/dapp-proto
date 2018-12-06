import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { infuraMain } from '../core/providers.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChainInfoService {

  constructor(private httpClient: HttpClient) { }

  public getInfo(): any {
    const payload = '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}';
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post(infuraMain.href, payload, {headers})
      .subscribe(response => {
        console.log(response);
        // TODO create interface and map response
        return new Observable(response.result);
      });
  }
}
