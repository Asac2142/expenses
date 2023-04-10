import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';
import { RootState } from '../store';
import * as ExpenseSelectors from '../store/expense/expense.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  private store: Store<RootState> = inject(Store<RootState>);
  expenses$!: Observable<(Expense | undefined)[]>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.expenses$ = this.store.select(ExpenseSelectors.selectAllExpenses);
    this.loading$ = this.store.select(ExpenseSelectors.selectLoading);
  }
}
