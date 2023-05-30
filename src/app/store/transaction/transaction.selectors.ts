import { createSelector } from '@ngrx/store';
import { noop } from 'rxjs';

import { Balance, CategoryGroup, Transaction, TransactionType } from 'src/app/common/models/transaction.model';
import {
  addDaysToDate,
  formatDate,
  getEndOfMonth,
  getStartOfMonth,
  toFixed
} from 'src/app/common/utils/category.utils.data';
import { TransactionStateEntity } from './transaction.entity';
import { PlotlyConfig } from 'src/app/common/models/chart.model';
import {
  colorsData,
  darkFontColor,
  defaultPlotBackgroundColor,
  expenseColor,
  fillWithRandomColors,
  hoverBackgroundColor,
  incomeColor,
  lightFontColor
} from 'src/app/common/utils/chart.colors';
import { selectThemeColorScheme } from '../settings/settings.selectors';
import * as index from '../index';

export const transactionSliceState = (state: index.RootState) => state.transactions;

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
  return getOverallBalanceByDate(transactions, currentDate);
});

export const searchTransactions = (text: string) =>
  createSelector(selectAllTransactions, transactions => filterTransactions(text, transactions));

export const selectPieChartConfig = createSelector(selectBalanceByDate, selectThemeColorScheme, (balance, scheme) =>
  getPieChartConfig(balance, scheme)
);

export const selectDetailBalance = (type: TransactionType) =>
  createSelector(selectAllTransactions, transactions => {
    const grouped = getDetailBalanceByDate(transactions);
    const byType = new Map<string, CategoryGroup>();

    grouped.forEach((group, key) => {
      if (group.category.type === type) byType.set(key, group);
    });

    const sortedByTotal = new Map([...byType.entries()].sort((a, b) => b[1].total - a[1].total));
    return sortedByTotal;
  });

export const selectIncomeDetailChart = createSelector(
  selectAllTransactions,
  selectThemeColorScheme,
  (transactionsData, scheme) => {
    const grouped = getDetailBalanceByDate(transactionsData);
    return getIncomesDetailChart(grouped, scheme);
  }
);

export const selectExpenseDetailChart = createSelector(
  selectAllTransactions,
  selectThemeColorScheme,
  (transactionsData, scheme) => {
    const grouped = getDetailBalanceByDate(transactionsData);
    return getExpensesDetailChart(grouped, scheme);
  }
);

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

function getOverallBalanceByDate(transactions: Transaction[], currentDate: Date): Balance {
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

function getPieChartConfig(balance: Balance, scheme: 'dark' | 'light'): PlotlyConfig {
  const { expense, income, total } = balance;
  const values = total === 0 ? undefined : [income, expense];

  const config: PlotlyConfig = {
    data: [
      {
        type: 'pie',
        hole: 0.4,
        values,
        labels: ['Incomes', 'Expenses'],
        marker: { colors: [incomeColor, expenseColor] }
      }
    ],
    layout: {
      title: 'Transactions Overview',
      width: 390,
      showlegend: true,
      legend: { xanchor: 'center', x: 0.5, y: -0.2 },
      hoverlabel: { bgcolor: hoverBackgroundColor },
      paper_bgcolor: defaultPlotBackgroundColor,
      font: { color: scheme === 'dark' ? lightFontColor : darkFontColor }
    },
    config: {
      displayModeBar: false
    }
  };

  return config;
}

function getDetailBalanceByDate(groupedTransactions: Map<string, Transaction[]>): Map<string, CategoryGroup> {
  const groupCategories = new Map<string, CategoryGroup>();

  groupedTransactions.forEach(transactions => {
    const categoryIds = transactions.map(transaction => transaction.category.id);
    const uniqueCategoryIds = [...new Set(categoryIds)];

    for (const uniqueCategId of uniqueCategoryIds) {
      const transactionsByCateId = transactions.filter(transaction => transaction.category.id === uniqueCategId);
      const total = transactionsByCateId.reduce((prev, curr) => (prev += curr.amount), 0);
      const category = transactionsByCateId[0].category;
      const newCategoryGroup: CategoryGroup = { total: toFixed(total), transactions: transactionsByCateId, category };
      const existGroupCategory = groupCategories.get(uniqueCategId);

      if (existGroupCategory) {
        const updatedTransactions = [...existGroupCategory.transactions, ...transactionsByCateId];
        const updatedTotal = existGroupCategory.total + total;
        const updatedCategoryGroup: CategoryGroup = {
          total: toFixed(updatedTotal),
          category: existGroupCategory.category,
          transactions: updatedTransactions
        };
        groupCategories.set(uniqueCategId, updatedCategoryGroup);
      } else groupCategories.set(uniqueCategId, newCategoryGroup);
    }
  });

  return groupCategories;
}

function getIncomesDetailChart(groupedTransactions: Map<string, CategoryGroup>, scheme: 'dark' | 'light'): PlotlyConfig {
  const { labels, values } = filterByTransactionType('income', groupedTransactions);
  const title = "Income's Detail";
  return getChartConfig(values, labels, scheme, title);
}

function getExpensesDetailChart(groupedTransactions: Map<string, CategoryGroup>, scheme: 'dark' | 'light'): PlotlyConfig {
  const { values, labels } = filterByTransactionType('expense', groupedTransactions);
  const title = "Expense's Detail";
  return getChartConfig(values, labels, scheme, title);
}

function filterByTransactionType(type: TransactionType, groupedTransactions: Map<string, CategoryGroup>) {
  const categoryByType: CategoryGroup[] = [];
  const values: number[] = [];
  const labels: string[] = [];
  const sorted = new Map([...groupedTransactions.entries()].sort((a, b) => b[1].total - a[1].total));

  sorted.forEach(groupedTransaction =>
    groupedTransaction.category.type === type ? categoryByType.push(groupedTransaction) : noop
  );

  for (const expense of categoryByType) {
    values.push(expense.total);
    labels.push(expense.category.label);
  }

  return { values, labels };
}

function getChartConfig(values: number[], labels: string[], scheme: 'dark' | 'light', title: string): PlotlyConfig {
  const colors = getColors(values.length);

  return {
    data: [
      {
        type: 'pie',
        hole: 0.4,
        values: [...values],
        labels: [...labels],
        marker: { colors: [...colors] }
      }
    ],
    layout: {
      title: title,
      width: 390,
      showlegend: false,
      hoverlabel: { bgcolor: hoverBackgroundColor },
      paper_bgcolor: defaultPlotBackgroundColor,
      font: { color: scheme === 'dark' ? lightFontColor : darkFontColor }
    },
    config: {
      displayModeBar: false
    }
  };
}

function getColors(end: number): string[] {
  if (end > colorsData.length) {
    const newColors = fillWithRandomColors(end - colorsData.length);
    return [...colorsData, ...newColors];
  }

  const sliced = colorsData.slice(0, end);
  return [...sliced];
}
