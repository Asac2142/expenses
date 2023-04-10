import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Transaction } from '../models/transaction.model';
import { RootState } from '../store';
import * as ExpenseSelectors from '../store/expense/expense.selectors';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TransactionListComponent]
})
export class HomePage implements OnInit {
  private store: Store<RootState> = inject(Store<RootState>);
  expenses$!: Observable<(Transaction | undefined)[]>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.expenses$ = this.store.select(ExpenseSelectors.selectAllExpenses);
    this.loading$ = this.store.select(ExpenseSelectors.selectLoading);
  }

  onAddTransaction(): void {
    console.log('Adding transaction...');
  }
}
