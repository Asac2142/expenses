import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '@store/index';
import { Transaction, Balance } from 'src/app/common/models/transaction.model';
import { subMonthToDate, addMonthToDate } from 'src/app/common/utils/category.utils.data';
import { BalanceDetailComponent } from './components/balance-detail/balance-detail.component';
import { DateNavigationComponent } from '../../common/components/date-navigation/date-navigation.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionModalComponent } from './modals/transaction-modal/transaction-modal.component';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as SettingsSelectors from '@store/settings/settings.selectors';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TransactionListComponent, DateNavigationComponent, BalanceDetailComponent]
})
export class TransactionsComponent implements OnInit {
  private store: Store<RootState> = inject(Store<RootState>);
  private modalCtrl = inject(ModalController);
  transactions$!: Observable<Map<string, Transaction[]>>;
  loading$!: Observable<boolean>;
  balance$!: Observable<Balance>;
  currentDate$!: Observable<Date>;
  currencySymbol$!: Observable<string>;
  showSearch = false;

  ngOnInit(): void {
    this.loadData();
  }

  back(currentDate: Date | null): void {
    if (currentDate) {
      const monthBack = subMonthToDate(currentDate, 1);
      this.store.dispatch(TransactionActions.setCurrentDate({ date: monthBack }));
    }
  }

  forward(currentDate: Date | null): void {
    if (currentDate) {
      const monthForward = addMonthToDate(currentDate, 1);
      this.store.dispatch(TransactionActions.setCurrentDate({ date: monthForward }));
    }
  }

  onFilterTransactions(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase() as string;
    this.transactions$ = this.store.select(TransactionSelectors.searchTransactions(value));
  }

  clearFilter(): void {
    this.transactions$ = this.store.select(TransactionSelectors.searchTransactions(''));
  }

  async onSelectedTransaction(transactionSelected: Transaction, currencySymbol: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TransactionModalComponent,
      componentProps: { transaction: transactionSelected, currencySymbol }
    });
    modal.present();
    const result = await modal.onDidDismiss();

    if (result?.data && result?.role === 'update') this.update(result.data as Transaction);
    if (result.data && result.role === 'delete') this.delete(result.data as string);
  }

  async onAddTransaction(currencySymbol: string): Promise<void> {
    const modal = await this.modalCtrl.create({ component: TransactionModalComponent, componentProps: { currencySymbol } });
    modal.present();
    const result = await modal.onDidDismiss();

    if (result?.data) {
      const transaction: Partial<Transaction> = result.data;
      this.store.dispatch(TransactionActions.addTransaction({ transaction }));
    }
  }

  private update(transaction: Transaction): void {
    this.store.dispatch(TransactionActions.updateTransaction({ transaction }));
  }

  private delete(transactionId: string): void {
    this.store.dispatch(TransactionActions.deleteTransaction({ transactionId }));
  }

  private loadData(): void {
    this.transactions$ = this.store.select(TransactionSelectors.selectAllTransactions);
    this.loading$ = this.store.select(TransactionSelectors.selectLoading);
    this.balance$ = this.store.select(TransactionSelectors.selectBalanceByDate);
    this.currentDate$ = this.store.select(TransactionSelectors.selectCurrentDateSelected);
    this.currencySymbol$ = this.store.select(SettingsSelectors.selectCurrentCurrency);
  }
}
