import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TokenTableDataSource } from './token-table.datasource';
import { DataService } from 'src/app/services/data.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss']
})
export class TokenTableComponent implements OnInit {
  loadedColumns = ['symbol', 'name', 'balance', 'rate'];
  pageSizeOptions = [5, 10, 20, 40];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;

  _internalService!: DataService | null;
  dataSource!: TokenTableDataSource | null;

  constructor() {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  refresh(): void {
    this.loadData();
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
