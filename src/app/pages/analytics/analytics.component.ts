import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DateNavigationComponent } from '../../common/date-navigation/date-navigation.component';
import { addMonthToDate, subMonthToDate } from 'src/app/common/utils/category.utils.data';
import { RootState } from '@store/index';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { Data, PlotlyConfig } from 'src/app/common/models/chart.model';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, DateNavigationComponent, PlotlyModule]
})
export class AnalyticsComponent implements OnInit {
  private _store = inject(Store<RootState>);
  currentDate$!: Observable<Date>;
  pieChartConfig$!: Observable<PlotlyConfig>;

  ngOnInit(): void {
    this.currentDate$ = this._store.select(TransactionSelectors.selectCurrentDateSelected);
    this.pieChartConfig$ = this._store.select(TransactionSelectors.selectPieChartConfig);
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
