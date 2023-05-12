import { createSelector } from '@ngrx/store';
import { noop } from 'rxjs';

import { Balance, Transaction, TransactionType } from 'src/app/common/models/transaction.model';
import { addDaysToDate, formatDate, getEndOfMonth, getStartOfMonth } from 'src/app/common/utils/category.utils.data';
import { TransactionStateEntity } from './transaction.entity';
import * as ExpenseRoot from '../index';

export const transactionSliceState = (state: ExpenseRoot.RootState) => state.transactions;

export const selectCurrentDateSelected = createSelector(transactionSliceState, state => state.selectedDate);

export const selectAllTransactions = createSelector(
  transactionSliceState,
  selectCurrentDateSelected,
  (state, currentDate) => {
    const transactions = getValidTransactions(state.transaction);
    return groupTransactionsByDate(transactions, currentDate);
  }
);

export const selectLoading = createSelector(transactionSliceState, state => state.loading);

export const selectCategories = (type: TransactionType) =>
  createSelector(transactionSliceState, state => state.categories.filter(c => c.type === type));

export const selectAllCategories = createSelector(transactionSliceState, state => state.categories);

export const selectBalanceByDate = createSelector(transactionSliceState, selectCurrentDateSelected, (state, currentDate) => {
  const transactions = getValidTransactions(state.transaction);
  return getBalanceDetailByDate(transactions, currentDate);
});

export const searchTransactions = (text: string) =>
  createSelector(selectAllTransactions, transactions => filterTransactions(text, transactions));

function getValidTransactions(transactionEntity: TransactionStateEntity): Transaction[] {
  const transactions: Transaction[] = [];
  Object.entries(transactionEntity.entities).forEach(v => (v[1]?.category ? transactions.push(v[1]) : noop));
  return transactions;
}

function filterTransactions(text: string, transactions: Map<string, Transaction[]>): Map<string, Transaction[]> {
  const result: Map<string, Transaction[]> = new Map();
  if (!text?.length) return transactions;

  transactions.forEach((data, key) => {
    const filtered = data.filter(d => d.description.toLowerCase().includes(text));
    if (filtered?.length) result.set(key, filtered);
  });

  return result;
}

function groupTransactionsByDate(transactions: Transaction[], currentDate: Date): Map<string, Transaction[]> {
  const groupByDate: Map<string, Transaction[]> = new Map();
  const startMonth = getStartOfMonth(currentDate);
  const endMonth = getEndOfMonth(currentDate);
  const lastDayOfMonth = endMonth.getDate();

  if (transactions?.length) {
    for (let i = 0; i < lastDayOfMonth; i++) {
      const addedDay = addDaysToDate(startMonth, i);
      const formatted_YYYYMMDD = formatDate(addedDay);
      const existTransactions = transactions.filter(
        t => formatDate(new Date(Date.parse(t.dateRegistered))) === formatted_YYYYMMDD
      );

      if (existTransactions?.length) {
        const shortDate = new Date(Date.parse(formatted_YYYYMMDD)).toDateString();
        groupByDate.set(shortDate, existTransactions);
      }
    }
  }

  return groupByDate;
}

function getBalanceDetailByDate(transactions: Transaction[], currentDate: Date): Balance {
  const startMonth = getStartOfMonth(currentDate);
  const endMonth = getEndOfMonth(currentDate);
  const lastDayOfMonth = endMonth.getDate();
  const expenseTotal: number[] = [];
  const incomeTotal: number[] = [];
  const result: Balance = { expense: 0, income: 0, total: 0 };

  if (transactions?.length) {
    for (let i = 0; i < lastDayOfMonth; i++) {
      const addedDay = addDaysToDate(startMonth, i);
      const formatted_YYYYMMDD = formatDate(addedDay);
      const existTransactions = transactions.filter(
        t => formatDate(new Date(Date.parse(t.dateRegistered))) === formatted_YYYYMMDD
      );

      if (existTransactions.length) {
        const onlyExpenses = existTransactions.filter(t => t.type === 'expense');
        const expenseValue = onlyExpenses.reduce((previous, current) => (previous += current.amount), 0);
        expenseTotal.push(expenseValue);

        const onlyIncomes = existTransactions.filter(t => t.type === 'income');
        const incomeValue = onlyIncomes.reduce((previous, current) => (previous += current.amount), 0);
        incomeTotal.push(incomeValue);
      }
    }

    const expense = expenseTotal.reduce((previous, current) => (previous += current), 0);
    const income = incomeTotal.reduce((previous, current) => (previous += current), 0);
    const total = Number((income - expense).toFixed(2));

    result.expense = Number(expense.toFixed(2));
    result.income = Number(income.toFixed(2));
    result.total = total;
  }

  return result;
}
