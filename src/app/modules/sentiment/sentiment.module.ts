import { NgModule } from '@angular/core';
import { SentimentRoutingModule } from './sentiment-routing.module';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { MonthSentimentComponent } from './components/month-sentiment/month-sentiment.component';
import { CommonPipesModule } from '../common-pipes/common-pipes.module';
import { SentimentService } from './services/sentiment.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SentimentRoutingModule, CommonPipesModule],
  declarations: [SentimentComponent, MonthSentimentComponent],
  providers: [SentimentService],
})
export class SentimentModule {}
