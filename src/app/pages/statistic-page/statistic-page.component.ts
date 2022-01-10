import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { bitcoinService } from '../../service/bitcoin.service';

Chart.register(...registerables);

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent {
  // marketPrice;
  // tradeVolume;
  constructor(private bitcoinService: bitcoinService) {}
  // async ngOnInit(): Promise<void> {
  //   this.marketPrice = await this.bitcoinService.getMarketPrice().toPromise();
  //   this.tradeVolume = await this.bitcoinService
  //     .getConfirmedTransactions()
  //     .toPromise();
  // }
  marketPrice = this.bitcoinService.loadData('marketPrice');
  
  tradeVolume = this.bitcoinService.loadData('tradeVolume'); 
}
