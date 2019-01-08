import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent, Subject } from 'rxjs';

import { TokenTableDataSource } from './token-table.datasource';
import { DataService } from 'src/app/services/data.service';
import { MediaService, MediaSize } from 'src/app/shared/media.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss']
})
export class TokenTableComponent implements OnInit, OnDestroy {
  private currentMedia = '';
  private _unsubscribe$: Subject<any>;
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

  constructor(private mediaService: MediaService) {
    this.mediaService
      .getMediaSize()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((mediaSize: MediaSize) => {
        this.currentMedia = mediaSize.current;
        this.getDisplayedColumns();
      });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.unsubscribe();
  }

  refresh(): void {
    this.loadData();
  }

  getDisplayedColumns(): string[] {
    return this.loadedColumns
      .filter(column => !this.isMobile() || column.mobile)
      .map(cd => cd.def);
  }

  private isMobile(): boolean {
    return this.currentMedia === MediaSize.XS;
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
