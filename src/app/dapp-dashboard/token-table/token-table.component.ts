import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { fromEvent } from 'rxjs';

import { mediaBreakWidth } from '@core/base.styles';
import { TokenTableDataSource } from './token-table.datasource';
import { DataService } from 'src/app/services/data.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss']
})
export class TokenTableComponent implements OnInit {
  private status = '';
  loadedColumns = [
    { def: 'symbol', mobile: true },
    { def: 'name', mobile: true },
    { def: 'balance', mobile: false },
    { def: 'rate', mobile: true }
  ];
  pageSizeOptions = [5, 10, 20, 40];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;

  _internalService!: DataService | null;
  dataSource!: TokenTableDataSource | null;

  constructor(private mediaObserver: MediaObserver) {
    const onChange = (change: MediaChange) => {
      this.status = change ? `${change.mqAlias}` : '';
    };
    this.mediaObserver.media$
      .pipe(
        tap((change: MediaChange) => {
          console.log(change);
          this.getDisplayedColumns();
        })
      )
      .subscribe(onChange);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  refresh(): void {
    this.loadData();
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.status === 'xs';
    return this.loadedColumns
      .filter(cd => !isMobile || cd.mobile)
      .map(cd => cd.def);
  }

  private loadData(): any {
    this._internalService = new DataService();
    this.dataSource = new TokenTableDataSource(
      this._internalService,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}
