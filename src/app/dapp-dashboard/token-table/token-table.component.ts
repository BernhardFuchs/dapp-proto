import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Select } from '@ngxs/store';
import { Observable, of as observableOf, combineLatest, merge, BehaviorSubject } from 'rxjs';
import { TokenTableDataSource } from './token-table-datasource';
import { TokenTableItem } from 'src/app/dapp-store/token-table.state.model';
import { TokenTableState } from 'src/app/dapp-store/token-table.state';
import { map, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss'],
})
export class TokenTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TokenTableDataSource;
  tableData: TokenTableItem[];
  // tokensLength$: Observable<number>;
  pagedData$: BehaviorSubject<TokenTableItem[]>;
  // totalData$: Observable<TokenTableItem[]>;

  pageSizeOptions = [7, 13, 23, 41];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  tableLength = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'name'];

  ngOnInit(): void {
    this.dataSource = new TokenTableDataSource(this.paginator, this.sort);
    this.pagedData$ = this.dataSource.getPagedItems();
    /* this.dataSource.totalItems$.subscribe(
      (value: TokenTableItem[]) => this.tableData = value
    ); */
    /* this.dataSource.pagedItems$.subscribe(() => this.pagedData$);
    this.dataSource.totalItems$.subscribe(() => this.totalData$);
    combineLatest(this.pagedData$, this.totalData$).pipe(
      tap(() => console.log('#####comp paged items', this.pagedData$)),
      tap(() => console.log('#####comp total items', this.totalData$)),
      map(() => this.tableData)
    ); */
  }

  public handlePage(pageEvent: PageEvent) {
    this.pagedData$.pipe(map((result) => {
      console.log('#####Result', result);
      this.pagedData$.next(result);
      this.pageSize = pageEvent.pageSize;
      this.pageIndex = pageEvent.pageIndex;
    }));
  }

}
