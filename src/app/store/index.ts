import { ActionReducerMap } from '@ngrx/store';
import * as fromExpenses from './expense/expense.reducer';

export interface RootState {
  expenses: fromExpenses.TransactionState;
}

export const reducers: ActionReducerMap<RootState> = {
  expenses: fromExpenses.reducer
};

export const getExpenseState = (state: RootState) => state.expenses;
