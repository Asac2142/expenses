import { createReducer } from '@ngrx/store';
import { ExpenseState, initialExpenseState } from './expense.entity';

export interface MyExpenseState {
  expense: ExpenseState;
  loading: boolean;
}

export const initialState: MyExpenseState = {
  expense: initialExpenseState,
  loading: false
};

export const reducer = createReducer(initialState);
