import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { StockWithSentiments } from '../../model/StockWithSentiments';
import { SentimentService } from '../../services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  stockSymbol: string = '';
  stock$!: Observable<StockWithSentiments>;

  constructor(
    private sentimentService: SentimentService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.stockSymbol = params.get('symbol') || '';
      this.stock$ = this.sentimentService.getStockSentimentForLastThreeMonth(
        this.stockSymbol
      );
    });
  }
}
