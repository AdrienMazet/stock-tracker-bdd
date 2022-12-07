import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { FinnhubService } from '../../../shared/services/finnhub.service';
import { StockWithSentiments } from '../model/StockWithSentiments';

@Injectable({ providedIn: 'root' })
export class SentimentService {
  constructor(private finnhubService: FinnhubService) {}

  getStockSentimentForLastThreeMonth(
    stockSymbol: string
  ): Observable<StockWithSentiments> {
    const currentDate = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(currentDate.getMonth() - 3);
    return combineLatest([
      this.finnhubService.getStockName(stockSymbol),
      this.finnhubService.getStockSentiment(
        stockSymbol,
        threeMonthAgo.toISOString().slice(0, 10),
        currentDate.toISOString().slice(0, 10)
      ),
    ]).pipe(
      map(([name, sentiments]) => ({ name, symbol: stockSymbol, sentiments }))
    );
  }
}
