import { Stock } from '../../../shared/model/Stock';

export interface StockWithQuote extends Stock {
  percentOfChange: number;
  currentPrice: number;
  openingPrice: number;
  highPrice: number;
}
