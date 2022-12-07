import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPipesModule } from '../common-pipes/common-pipes.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { FormsModule } from '@angular/forms';
import { StockService } from './services/stock.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonPipesModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    StockFormComponent,
    StockListComponent,
    StockCardComponent,
  ],
  providers: [StockService, LocalStorageService],
})
export class DashboardModule {}
