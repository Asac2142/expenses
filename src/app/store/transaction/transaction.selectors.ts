import { createSelector } from '@ngrx/store';
import { noop } from 'rxjs';

import { Transaction, TransactionType } from 'src/app/common/models/transaction.model';
import { addDaysToDate, formatDate, getEndOfMonth, getStartOfMonth } from 'src/app/common/utils/category.utils.data';
import * as ExpenseRoot from '../index';

export const transactionSliceState = (state: ExpenseRoot.RootState) => state.transactions;

export const selectCurrentDateSelected = createSelector(transactionSliceState, state => state.selectedDate);

export const selectAllTransactions = createSelector(
  transactionSliceState,
  selectCurrentDateSelected,
  (state, currentDate) => {
    const transactions: Transaction[] = [];
    Object.entries(state.transaction.entities).forEach(v => (v[1]?.category ? transactions.push(v[1]) : noop));
    return groupTransactionsByDate(transactions, currentDate);
  }
);

export const selectLoading = createSelector(transactionSliceState, state => state.loading);

export const selectCategories = (type: TransactionType) =>
  createSelector(transactionSliceState, state => state.categories.filter(c => c.type === type));

export const selectAllCategories = createSelector(transactionSliceState, state => state.categories);

function groupTransactionsByDate(transactions: Transaction[], currentDate: Date): Map<string, Transaction[]> {
  const groupByDate: Map<string, Transaction[]> = new Map();
  const startMonth = getStartOfMonth(currentDate);
  const endMonth = getEndOfMonth(currentDate);
  const lastDayOfMonth = endMonth.getDate();

  if (transactions?.length) {
    for (let i = 0; i < lastDayOfMonth; i++) {
      const addedDay = addDaysToDate(startMonth, i);
      const formatted_YYYYMMDD = formatDate(addedDay);
      const existTransactions = transactions.filter(t => formatDate(new Date(Date.parse(t.dateRegistered))) === formatted_YYYYMMDD);

      if (existTransactions?.length) {
        const shortDate = new Date(Date.parse(formatted_YYYYMMDD)).toDateString();
        groupByDate.set(shortDate, existTransactions);
      }
    }
  }

  return groupByDate;
}
