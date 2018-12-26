import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChainInfoFetchAction, ChainInfoState } from '../dapp-store';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SCROLL_CONTAINER = '.mat-drawer-content';
const PRIMARY_TEXT_THRESHOLD = 22;
@Component({
  selector: 'app-dapp-header',
  templateUrl: './dapp-header.component.html',
  styleUrls: ['./dapp-header.component.scss']
})
export class DappHeaderComponent implements OnInit, OnDestroy {

  public popText: boolean;
  public applyShadow: boolean;

  @Select(ChainInfoState.getCurrentBlock) currentBlock$;
  private payload = '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}';
  private _onDestroy = new Subject();

  constructor(private store$: Store) { }

  ngOnInit() {
    this.store$.dispatch(new ChainInfoFetchAction(this.payload));

    const container = document.querySelector(SCROLL_CONTAINER);
    fromEvent(container, 'scroll').pipe(
      takeUntil(this._onDestroy)
    ).subscribe(() => this.determineHeader(container.scrollTop));
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

  private determineHeader(top: number) {
    if (top >= PRIMARY_TEXT_THRESHOLD) {
      this.popText = true;
    } else {
      this.popText = false;
    }
  }

}
