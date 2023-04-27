import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatetime, IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Balance, Transaction } from '../common/models/transaction.model';
import { RootState } from '@store/index';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionModalComponent } from './modals/transaction-modal/transaction-modal.component';
import { addMonthToDate, subMonthToDate } from '../common/utils/category.utils.data';
import { DateNavigationComponent } from './components/date-navigation/date-navigation.component';
import { BalanceDetailComponent } from './components/balance-detail/balance-detail.component';

import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as TransactionActions from '@store/transaction/transaction.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TransactionListComponent, DateNavigationComponent, BalanceDetailComponent]
})
export class HomePage implements OnInit {
  private store: Store<RootState> = inject(Store<RootState>);
  private modalCtrl = inject(ModalController);
  transactions$!: Observable<Map<string, Transaction[]>>;
  loading$!: Observable<boolean>;
  balance$!: Observable<Balance>;
  currentDate$!: Observable<Date>;
  showSearch = false;

  ngOnInit(): void {
    this.dispatchCategories();
    this.loadData();
  }

  back(currentDate: Date | null, dateTimePicker: ElementRef): void {
    if (currentDate) {
      const monthBack = subMonthToDate(currentDate, 1);
      const datePicker = dateTimePicker.nativeElement as IonDatetime;
      datePicker.value = monthBack.toISOString();
      this.store.dispatch(TransactionActions.setCurrentDate({ date: monthBack }));
    }
  }

  forward(currentDate: Date | null, dateTimePicker: ElementRef): void {
    if (currentDate) {
      const monthForward = addMonthToDate(currentDate, 1);
      const datePicker = dateTimePicker.nativeElement as IonDatetime;
      datePicker.value = monthForward.toISOString();
      this.store.dispatch(TransactionActions.setCurrentDate({ date: monthForward }));
    }
  }

  async onAddTransaction(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: TransactionModalComponent });
    modal.present();
    const result = await modal.onDidDismiss();

    if (result?.data) {
      const transaction: Partial<Transaction> = result.data;
      this.store.dispatch(TransactionActions.addTransaction({ transaction }));
    }
  }

  private loadData(): void {
    this.transactions$ = this.store.select(TransactionSelectors.selectAllTransactions);
    this.loading$ = this.store.select(TransactionSelectors.selectLoading);
    this.balance$ = this.store.select(TransactionSelectors.selectBalanceByDate);
    this.currentDate$ = this.store.select(TransactionSelectors.selectCurrentDateSelected);
  }

  private dispatchCategories(): void {
    this.store.dispatch(TransactionActions.setTransactions());
    this.store.dispatch(TransactionActions.setCategories());
  }
}
