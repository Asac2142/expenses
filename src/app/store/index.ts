import { ActionReducerMap } from '@ngrx/store';
import * as fromExpenses from './transaction/transaction.reducer';
import * as fromSettings from './settings/settings.reducer';

export interface RootState {
  transactions: fromExpenses.TransactionState;
  settings: fromSettings.SettingsState;
}

export const reducers: ActionReducerMap<RootState> = {
  transactions: fromExpenses.reducer,
  settings: fromSettings.reducer
};

export const getExpenseState = (state: RootState) => state.transactions;
export const getSettingsState = (state: RootState) => state.settings;
