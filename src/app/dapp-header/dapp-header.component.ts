import { Component, OnInit } from '@angular/core';
import { ChainInfoService } from '@services/chain-info.service';

@Component({
  selector: 'app-dapp-header',
  templateUrl: './dapp-header.component.html',
  styleUrls: ['./dapp-header.component.scss']
})
export class DappHeaderComponent implements OnInit {

  public currentBlock: string;

  constructor(private chainInfoService: ChainInfoService) { }

  ngOnInit() {
    // this.chainInfoService.getInfo().subscribe(result => this.currentBlock = result);
  }

}
