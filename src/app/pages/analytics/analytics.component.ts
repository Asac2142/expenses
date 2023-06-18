import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActionSheetButton, ActionSheetController, IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { DateNavigationComponent } from '../../common/components/date-navigation/date-navigation.component';
import { addMonthToDate, subMonthToDate } from 'src/app/common/utils/category.utils.data';
import { RootState } from '@store/index';
import { Data, PlotlyConfig } from 'src/app/common/models/chart.model';
import { PlotComponent } from './plot/plot.component';
import { CategoryGroup } from 'src/app/common/models/transaction.model';
import { PlotCustomLegendComponent } from './plot-custom-legend/plot-custom-legend.component';
import { PlotDetailComponent } from './plot-detail/plot-detail.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as SettingsSelectors from '@store/settings/settings.selectors';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    DateNavigationComponent,
    PlotCustomLegendComponent,
    PlotComponent,
    PlotDetailComponent
  ]
})
export class AnalyticsComponent implements OnInit {
  private _store = inject(Store<RootState>);
  private _modal = inject(ModalController);
  private _actionSheet = inject(ActionSheetController);
  currentDate$!: Observable<Date>;
  overallChartConfig$!: Observable<PlotlyConfig>;
  incomeChartConfig$!: Observable<PlotlyConfig>;
  expenseChartConfig$!: Observable<PlotlyConfig>;
  incomeDetail$!: Observable<Map<string, CategoryGroup>>;
  expenseDetail$!: Observable<Map<string, CategoryGroup>>;
  currencySymbol$!: Observable<string>;
  incomeColors!: string[];
  expenseColors!: string[];
  optionSelected = 'overview';

  ngOnInit(): void {
    this.loadData();
  }

  onChange(option: 'overview' | 'income' | 'expense'): void {
    this.optionSelected = option;
  }

  getLabel(): {text: string; icon: string } {
    if (this.optionSelected === 'income') return { text: 'Income Chart', icon: 'trending-up-outline' };
    if (this.optionSelected === 'expense') return { text: 'Expense Chart', icon: 'trending-down-outline' };

    return { text: 'Overview Chart', icon: 'bar-chart-outline' };
  }

  async onOpenActionSheet(): Promise<void> {
    const actionSheet = await this._actionSheet.create({
      header: 'Chart Options',
      subHeader: 'Select a Chart to see it in detail',
      buttons: this.getButtons()
    });

    await actionSheet.present();
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

  async onDetailSelected(categoryGroup: CategoryGroup, currencySymbol: string): Promise<void> {
    const modal = await this._modal.create({
      component: DetailModalComponent,
      componentProps: { categoryGroup, currencySymbol }
    });
    modal.present();
  }

  private getButtons(): ActionSheetButton[] {
    return [
      { text: 'Overview Chart', icon: 'bar-chart-outline', handler: () => this.onChange('overview') },
      { text: 'Income Chart', icon: 'trending-up-outline', handler: () => this.onChange('income') },
      { text: 'Expense Chart', icon: 'trending-down-outline', handler: () => this.onChange('expense') },
      { text: 'Cancel', icon: 'close' }
    ];
  }

  private loadData(): void {
    this.currencySymbol$ = this._store.select(SettingsSelectors.selectCurrentCurrency);
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
}
