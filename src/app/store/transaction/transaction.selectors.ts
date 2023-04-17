import { TransactionType } from 'src/app/models/transaction.model';
import * as ExpenseRoot from '../index';
import { createSelector } from '@ngrx/store';

export const selectExpenseSlice = (state: ExpenseRoot.RootState) => state.transactions;

export const selectAllExpenses = createSelector(selectExpenseSlice, state =>
  Object.entries(state.expense.entities).map(v => v[1])
);
export const selectLoading = createSelector(selectExpenseSlice, state => state.loading);

export const selectCategories = (type: TransactionType) =>
  createSelector(selectExpenseSlice, state => state.categories.filter(c => c.type === type));
