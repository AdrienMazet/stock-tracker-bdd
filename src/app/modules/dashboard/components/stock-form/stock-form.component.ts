import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent {
  stockSymbol: string = '';

  constructor(private stockService: StockService) {}

  onSubmit() {
    this.stockService.trackStock(this.stockSymbol);
    this.stockSymbol = '';
  }
}
