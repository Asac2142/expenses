import { createReducer, on } from '@ngrx/store';
import { ExpenseState, initialExpenseState, adapter } from './expense.entity';
import * as ExpenseActions from './expense.actions';

export interface TransactionState {
  expense: ExpenseState;
  loading: boolean;
}

export const initialState: TransactionState = {
  expense: initialExpenseState,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(ExpenseActions.addTransaction, (state): TransactionState => ({ ...state, loading: true })),
  on(ExpenseActions.addTransactionFailed, (state): TransactionState => ({ ...state, loading: false })),
  on(
    ExpenseActions.addTransactionSuccess,
    (state, { transaction }): TransactionState => ({
      ...state,
      loading: false,
      expense: adapter.addOne(transaction, state.expense)
    })
  )
);
