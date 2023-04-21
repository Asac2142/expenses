import { TransactionType } from 'src/app/common/models/transaction.model';
import * as ExpenseRoot from '../index';
import { createSelector } from '@ngrx/store';

export const transactionSliceState = (state: ExpenseRoot.RootState) => state.transactions;

export const selectAllTransactions = createSelector(transactionSliceState, state =>
  Object.entries(state.transaction.entities).map(v => v[1])
);
export const selectLoading = createSelector(transactionSliceState, state => state.loading);

export const selectCategories = (type: TransactionType) =>
  createSelector(transactionSliceState, state => state.categories.filter(c => c.type === type));

export const selectAllCategories = createSelector(transactionSliceState, state => state.categories);
