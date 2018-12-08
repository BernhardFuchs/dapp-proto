import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChainInfoFetchAction, ChainInfoState } from '../dapp-store';

@Component({
  selector: 'app-dapp-header',
  templateUrl: './dapp-header.component.html',
  styleUrls: ['./dapp-header.component.scss']
})
export class DappHeaderComponent implements OnInit {

  @Select(ChainInfoState.getCurrentBlock) currentBlock$;
  private payload = '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}';

  constructor(private store$: Store) { }

  ngOnInit() {
    this.store$.dispatch(new ChainInfoFetchAction(this.payload));
  }

}
