import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [{ path: '', component: SentimentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentimentRoutingModule {}
