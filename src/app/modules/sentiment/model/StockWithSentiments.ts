import { Stock } from '../../../shared/model/Stock';
import { Sentiment } from './Sentiment';

export interface StockWithSentiments extends Stock {
  sentiments: (Sentiment | null)[];
}
