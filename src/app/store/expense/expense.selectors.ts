import * as ExpenseRoot from '../index';
import { createSelector } from '@ngrx/store';

export const selectExpenseSlice = (state: ExpenseRoot.RootState) => state.expenses;

export const selectAllExpenses = createSelector(selectExpenseSlice, state =>
  Object.entries(state.expense.entities).map(v => v[1])
);
export const selectLoading = createSelector(selectExpenseSlice, state => state.loading);
