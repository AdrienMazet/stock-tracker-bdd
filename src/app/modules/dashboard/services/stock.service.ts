import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FinnhubService } from '../../../shared/services/finnhub.service';
import { StockWithQuote } from '../model/StockWithQuote';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private STORAGE_KEY = 'STOCKS';
  trackedStocks$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    JSON.parse(this.localStorageService.getData(this.STORAGE_KEY) || '[]')
  );

  constructor(
    private finnhubService: FinnhubService,
    private localStorageService: LocalStorageService
  ) {
    this.trackedStocks$.subscribe((trackedStocks) => {
      this.localStorageService.setData(
        this.STORAGE_KEY,
        JSON.stringify(trackedStocks)
      );
    });
  }

  getStockQuote(stockSymbol: string): Observable<StockWithQuote> {
    return combineLatest([
      this.finnhubService.getStockName(stockSymbol),
      this.finnhubService.getStockQuote(stockSymbol),
    ]).pipe(map(([name, quote]) => ({ name, symbol: stockSymbol, ...quote })));
  }

  trackStock(stockSymbol: string) {
    this.trackedStocks$.next([stockSymbol, ...this.trackedStocks$.value]);
  }

  removeTrackedStock(stockSymbol: string) {
    this.trackedStocks$.next(
      this.trackedStocks$.value.filter(
        (trackedStock) => trackedStock !== stockSymbol
      )
    );
  }
}
