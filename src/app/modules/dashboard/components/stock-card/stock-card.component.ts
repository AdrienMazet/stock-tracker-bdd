import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StockWithQuote } from '../../model/StockWithQuote';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardComponent implements OnInit {
  @Input() stockSymbol: string = '';
  stock$!: Observable<StockWithQuote>;

  constructor(public stockService: StockService) {}

  ngOnInit() {
    this.stock$ = this.stockService.getStockQuote(this.stockSymbol);
  }
}
