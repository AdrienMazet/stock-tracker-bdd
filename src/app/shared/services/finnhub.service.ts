import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Sentiment } from '../../modules/sentiment/model/Sentiment';

@Injectable({
  providedIn: 'root',
})
export class FinnhubService {
  private SEARCH_ENDPOINT = '/search';
  private QUOTE_ENDPOINT = '/quote';
  private SENTIMENT_ENDPOINT = '/stock/insider-sentiment';

  constructor(private httpClient: HttpClient) {}

  private getPreparedURL(url: string) {
    return `https://finnhub.io/api/v1${url}&token=bu4f8kn48v6uehqi3cqg`;
  }

  getStockName(stockSymbol: string) {
    return this.httpClient
      .get<{ count: number; result: { description: string }[] }>(
        this.getPreparedURL(`${this.SEARCH_ENDPOINT}?q=${stockSymbol}`)
      )
      .pipe(map((response) => response?.result[0]?.description));
  }

  getStockQuote(stockSymbol: string) {
    return this.httpClient
      .get<{
        dp: number;
        c: number;
        o: number;
        h: number;
      }>(this.getPreparedURL(`${this.QUOTE_ENDPOINT}?symbol=${stockSymbol}`))
      .pipe(
        map(({ dp, c, o, h }) => ({
          percentOfChange: dp,
          currentPrice: c,
          openingPrice: o,
          highPrice: h,
        }))
      );
  }

  getStockSentiment(stockSymbol: string, from: string, to: string) {
    return this.httpClient
      .get<{ data: { month: number; change: number; mspr: number }[] }>(
        this.getPreparedURL(
          `${this.SENTIMENT_ENDPOINT}?symbol=${stockSymbol}&from=${from}&to=${to}`
        )
      )
      .pipe(
        map((response) =>
          response.data.map((sentiment) => {
            const date = new Date();
            date.setMonth(sentiment.month);
            const month = date.toLocaleString('default', { month: 'long' });
            return { ...sentiment, month };
          })
        ),
        map(
          (sentiments) =>
            [
              ...sentiments,
              ...Array.from({ length: 3 - sentiments.length }, () => null),
            ] as (Sentiment | null)[]
        )
      );
  }
}
