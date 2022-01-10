import { StorageService } from './storageService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class bitcoinService {
  constructor(private http: HttpClient,
    ) {}
  getRate(coins) {
    const data = this.http
      .get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      .pipe(map((res) => res));
    return data;
    
  }

  private getData(type: string) {
    switch (type) {
      case 'marketPrice':
        return this.http
          .get(
            'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
          )
          .subscribe((data: string) => {
            StorageService.store(type, data);
            return data;
          });
      case 'bitcoinRate':
        return this.http
          .get('https://blockchain.info/tobtc?currency=USD&value=1')
          .subscribe((data: string) => {
            StorageService.store(type, data);
            return data;
          });
      case 'tradeVolume':
        return this.http
          .get(
            'https://api.blockchain.info/charts/trade-volume?timespan=2months&format=json&cors=true'
          )
          .subscribe((data: string) => {
            StorageService.store(type, data);
            return data;
          });
      default:
        return this.http
          .get(
            'https://api.blockchain.info/charts/trade-volume?timespan=2months&format=json&cors=true'
          )
          .subscribe((data: string) => {
            StorageService.store(type, data);
            return data;
          });
    }
  }
  getMarketPrice() {
    const data = this.http
      .get<{ values: [x: number, y: number] }>(
        `https://api.blockchain.info/charts/market-price`,
        {
          params: {
            timespan: '5months',
            format: 'json',
            cors: true,
          },
        }
      )
      .pipe(map((res) => res.values));
    return data;
  }
  getConfirmedTransactions() {
    const data = this.http
      .get<{ values: [x: number, y: number] }>(
        `https://api.blockchain.info/charts/trade-volume`,
        {
          params: {
            timespan: '5months',
            format: 'json',
            cors: true,
          },
        }
      )
      .pipe(map((res) => res.values));
    return data;
  }
  public loadData(type: string) {
    let requestedData = StorageService.load(type);
    console.log(requestedData);
    if (!requestedData||requestedData.length===0) {
      console.log(`Loading ${type} data from api...`);
      requestedData = this.getData(type);
    }
    console.log(requestedData);
    return requestedData;
  }
}
