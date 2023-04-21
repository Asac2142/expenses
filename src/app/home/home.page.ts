import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Transaction } from '../common/models/transaction.model';
import { RootState } from '../store';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import * as TransactionSelectors from '../store/transaction/transaction.selectors';
import * as TransactionActions from '../store/transaction/transaction.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TransactionListComponent]
})
export class HomePage implements OnInit {
  private store: Store<RootState> = inject(Store<RootState>);
  private modalCtrl = inject(ModalController);
  transactions$!: Observable<(Transaction | undefined)[]>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.dispatchCategories();
    this.loadData();
  }

  async onAddTransaction(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: CreateTransactionComponent });
    modal.present();
  }

  private loadData(): void {
    this.transactions$ = this.store.select(TransactionSelectors.selectAllTransactions);
    this.loading$ = this.store.select(TransactionSelectors.selectLoading);
  }

  private dispatchCategories(): void {
    this.store.dispatch(TransactionActions.setCategories());
  }
}
