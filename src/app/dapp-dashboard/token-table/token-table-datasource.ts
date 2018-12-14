import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Select } from '@ngxs/store';
import { TokenTableItem } from 'src/app/dapp-store/token-table.state.model';
import { TokenTableState } from 'src/app/dapp-store/token-table.state';

/**
 * Data source for the TokenTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TokenTableDataSource extends DataSource<TokenTableItem> {
  @Select(TokenTableState.getTokenTableItems) private tokenTableItems$: Observable<TokenTableItem[]>;
  totalItems$ = new BehaviorSubject<TokenTableItem[]>([]);
  pagedItems$ = new BehaviorSubject<TokenTableItem[]>([]);

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TokenTableItem[]> {
    this.tokenTableItems$.subscribe(item => this.totalItems$.next(item));

    // init on first connect
    if (this.totalItems$.value === undefined) {
      this.totalItems$.next([]);
      this.setPaginatorLength();
    }
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.totalItems$),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => this.totalItems$.next(this.getPagedData(this.getSortedData([...this.totalItems$.value])))),
      mergeMap(() => this.totalItems$)
    );

  }

  private setPaginatorLength() {
    this.paginator.length = this.totalItems$.value.length;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.totalItems$.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TokenTableItem[]): TokenTableItem[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TokenTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'symbol': return compare(a.symbol, b.symbol, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
