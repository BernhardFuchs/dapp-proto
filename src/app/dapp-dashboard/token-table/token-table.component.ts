import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';

import { TokenTableDataSource } from './token-table.datasource';
import { DataService } from 'src/app/services/data.service';
import { MediaService } from 'src/app/shared/media.service';
import { MediaSize } from 'src/app/shared/media-size';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss']
})
export class TokenTableComponent implements OnInit {
  private _currentMedia = '';
  loadedColumns = [
    { def: 'symbol', mobile: true },
    { def: 'name', mobile: true },
    { def: 'balance', mobile: false },
    { def: 'rate', mobile: true }
  ];
  pageSizeOptions = [5, 10, 20, 40];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;

  private _dataService!: DataService | null;
  dataSource!: TokenTableDataSource | null;

  constructor(private mediaService: MediaService) {
    this.mediaService.getMediaSize().subscribe((mediaSize: MediaSize) => {
      this._currentMedia = mediaSize.current;
      this.getDisplayedColumns();
    });
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
    return this.loadedColumns
      .filter(column => !this.isMobile() || column.mobile)
      .map(cd => cd.def);
  }

  private isMobile(): boolean {
    return this._currentMedia === MediaSize.XS;
  }

  private loadData(): any {
    this._dataService = new DataService();
    this.dataSource = new TokenTableDataSource(
      this._dataService,
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
