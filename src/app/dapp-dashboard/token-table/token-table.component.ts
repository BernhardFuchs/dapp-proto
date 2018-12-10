import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TokenTableDataSource } from './token-table-datasource';
import { TokenTableItem } from 'src/app/dapp-store/token-table.state.model';
import { TokenTableState } from 'src/app/dapp-store/token-table.state';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss'],
})
export class TokenTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TokenTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'name'];

  ngOnInit() {
    this.dataSource = new TokenTableDataSource(this.paginator, this.sort);
  }
}
