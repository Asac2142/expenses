import { ActionReducerMap } from '@ngrx/store';
import * as fromExpenses from './transaction/transaction.reducer';

export interface RootState {
  transactions: fromExpenses.TransactionState;
}

export const reducers: ActionReducerMap<RootState> = {
  transactions: fromExpenses.reducer
};

export const getExpenseState = (state: RootState) => state.transactions;
