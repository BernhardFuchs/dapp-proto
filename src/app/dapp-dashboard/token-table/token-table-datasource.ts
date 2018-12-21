import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { TokenTableItem } from 'src/app/dapp-store/token-table.state.model';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';

/**
 * Data source for the TokenTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
 @Injectable({
  providedIn: 'root'
})
export class TokenTableDataSource extends DataSource<TokenTableItem> {
  _dataChange: BehaviorSubject<TokenTableItem[]> = new BehaviorSubject<TokenTableItem[]>([]);
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    console.log('####DataSource getFilter FilterChange: ', this._filterChange);
    console.log('####DataSource getFilter FilterChangeValue: ', this._filterChange.value);
    return this._filterChange.value;
  }

  set filter(filter: string) {
    console.log('####DataSource setFilter FilterChange: ', this._filterChange);
    console.log('####DataSource setFilter FilterChangeValue: ', this._filterChange.value);
    this._filterChange.next(filter);
  }

  filteredData: TokenTableItem[] = [];
  renderedData: TokenTableItem[] = [];

  constructor(public _internalService: DataService, public _paginator: MatPaginator, public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TokenTableItem[]> {

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this._dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this._internalService.getAllItems().subscribe(data => {
      this._dataChange.next(data);
    });

    return merge(...dataMutations).pipe(map( () => {
      // Filter data
      console.log('####DataCahange merge object: ', this._dataChange);
      console.log('####DataCahange merge value: ', this._dataChange.value);
      this.filteredData = this._dataChange.value.slice().filter((item: TokenTableItem) => {
        const searchStr = (item.symbol + item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
      console.log('####DataSource connect merge filteredData: ', this.filteredData);
        // Sort filtered data
        const sortedData = this.getSortedData(this.filteredData.slice());
        console.log('####DataSource connect merge sortedData: ', sortedData);

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        console.log('####DataSource connect merge renderedData: ', this.renderedData);
        return this.renderedData;
      }
    ));

  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TokenTableItem[]): TokenTableItem[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TokenTableItem[]): TokenTableItem[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this._sort.direction === 'asc';
      switch (this._sort.active) {
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
