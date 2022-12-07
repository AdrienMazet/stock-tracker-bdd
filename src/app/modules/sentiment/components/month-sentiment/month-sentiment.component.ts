import { Component, Input } from '@angular/core';
import { Sentiment } from '../../model/Sentiment';

@Component({
  selector: 'app-month-sentiment',
  templateUrl: './month-sentiment.component.html',
  styleUrls: ['./month-sentiment.component.css'],
})
export class MonthSentimentComponent {
  @Input() sentiment: Sentiment | null = null;
}
