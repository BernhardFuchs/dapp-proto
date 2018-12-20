import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TokenTableDataSource } from './token-table-datasource';
import { DataService } from 'src/app/services/data.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss'],
})
export class TokenTableComponent implements OnInit {
  /* pageSizeOptions = [5, 10, 20, 40];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  tableLength = 0; */

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'name'];

  _internalService: DataService | null;
  dataSource: TokenTableDataSource | null;

  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit(): void {
    console.log('####AppComponent onInit this._internalService: ', this._internalService);
    console.log('####AppComponent onInit this.dataSource: ', this.dataSource);
    console.log('####AppComponent onInit this.displayedColumns: ', this.displayedColumns);
    console.log('####AppComponent onInit this.filter: ', this.filter);
    console.log('####AppComponent onInit this.paginator: ', this.paginator);
    console.log('####AppComponent onInit this.sort: ', this.sort);
    this.loadData();
  }

  refresh(): void {
    console.log('####AppComponent onInit this._internalService: ', this._internalService);
    console.log('####AppComponent onInit this.dataSource: ', this.dataSource);
    console.log('####AppComponent onInit this.displayedColumns: ', this.displayedColumns);
    console.log('####AppComponent onInit this.filter: ', this.filter);
    console.log('####AppComponent onInit this.paginator: ', this.paginator);
    console.log('####AppComponent onInit this.sort: ', this.sort);
    this.loadData();
  }

  private loadData(): any {
    this._internalService = new DataService();
    console.log('####AppComponent loadData this._internalService: ', this._internalService);
    this.dataSource = new TokenTableDataSource(this._internalService, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          console.log('####AppComponent loadData fromEvent subscribe in if');
          return;
        }
        console.log('####AppComponent loadData fromEvent subscribe this.filter.nativeElement.value: ', this.filter.nativeElement.value);
        this.dataSource.filter = this.filter.nativeElement.value;
        console.log('####AppComponent loadData fromEvent subscribe this.dataSource.filter: ', this.dataSource.filter);
      });
  }
}
