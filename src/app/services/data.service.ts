import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, merge} from 'rxjs';
import { TokenTableItem } from '../dapp-store/token-table.state.model';
import { TokenTableState } from '../dapp-store/token-table.state';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Select(TokenTableState.getTokenTableItems)
  private tokenTableItems$: Observable<TokenTableItem[]>;
  private initValue: BehaviorSubject<TokenTableItem[]> = new BehaviorSubject<TokenTableItem[]>([]);


  getAllItems(): Observable<TokenTableItem[]> {
    const sources = [
      this.tokenTableItems$,
      this.initValue
    ];
    return merge(...sources);
  }
}
