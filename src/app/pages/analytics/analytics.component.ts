import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { DateNavigationComponent } from '../../common/components/date-navigation/date-navigation.component';
import { addMonthToDate, subMonthToDate } from 'src/app/common/utils/category.utils.data';
import { RootState } from '@store/index';
import { Data, PlotlyConfig } from 'src/app/common/models/chart.model';
import { PlotComponent } from './plot/plot.component';
import { CategoryGroup } from 'src/app/common/models/transaction.model';
import { PlotCustomLegendComponent } from './plot-custom-legend/plot-custom-legend.component';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, DateNavigationComponent, PlotCustomLegendComponent, PlotComponent]
})
export class AnalyticsComponent implements OnInit {
  private _store = inject(Store<RootState>);
  currentDate$!: Observable<Date>;
  overallChartConfig$!: Observable<PlotlyConfig>;
  incomeChartConfig$!: Observable<PlotlyConfig>;
  expenseChartConfig$!: Observable<PlotlyConfig>;
  incomeDetail$!: Observable<Map<string, CategoryGroup>>;
  expenseDetail$!: Observable<Map<string, CategoryGroup>>;
  incomeColors!: string[];
  expenseColors!: string[];

  ngOnInit(): void {
    this.currentDate$ = this._store.select(TransactionSelectors.selectCurrentDateSelected);
    this.overallChartConfig$ = this._store.select(TransactionSelectors.selectPieChartConfig);
    this.incomeChartConfig$ = this._store
      .select(TransactionSelectors.selectIncomeDetailChart)
      .pipe(tap(config => (this.incomeColors = config.data[0].marker?.colors || [])));
    this.expenseChartConfig$ = this._store
      .select(TransactionSelectors.selectExpenseDetailChart)
      .pipe(tap(config => (this.expenseColors = config.data[0].marker?.colors || [])));
    this.expenseDetail$ = this._store.select(TransactionSelectors.selectDetailBalance('expense'));
    this.incomeDetail$ = this._store.select(TransactionSelectors.selectDetailBalance('income'));
  }

  back(currentDate: Date): void {
    const monthBack = subMonthToDate(currentDate, 1);
    this._store.dispatch(TransactionActions.setCurrentDate({ date: monthBack }));
  }

  forward(currentDate: Date): void {
    const monthForward = addMonthToDate(currentDate, 1);
    this._store.dispatch(TransactionActions.setCurrentDate({ date: monthForward }));
  }

  existsData(plotData: Data[]): boolean {
    return !!plotData[0].values;
  }
}
