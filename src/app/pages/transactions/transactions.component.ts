import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { IonDatetime, IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Observable } from 'rxjs';
import { Transaction, Balance } from 'src/app/common/models/transaction.model';
import { subMonthToDate, addMonthToDate } from 'src/app/common/utils/category.utils.data';
import { BalanceDetailComponent } from './components/balance-detail/balance-detail.component';
import { DateNavigationComponent } from './components/date-navigation/date-navigation.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionModalComponent } from './modals/transaction-modal/transaction-modal.component';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as TransactionActions from '@store/transaction/transaction.actions';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TransactionListComponent, DateNavigationComponent, BalanceDetailComponent]
})
export class TransactionsComponent  implements OnInit {

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

  onFilterTransactions(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase() as string;
    this.transactions$ = this.store.select(TransactionSelectors.searchTransactions(value));
  }

  async onSelectedTransaction(transactionSelected: Transaction): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TransactionModalComponent,
      componentProps: { transaction: transactionSelected }
    });
    modal.present();
    const result = await modal.onDidDismiss();

    if (result?.data && result?.role === 'update') this.update(result.data as Transaction);
    if (result.data && result.role === 'delete') this.delete(result.data as string);
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
  }

  private dispatchCategories(): void {
    this.store.dispatch(TransactionActions.setTransactions());
    this.store.dispatch(TransactionActions.setCategories());
  }

}
