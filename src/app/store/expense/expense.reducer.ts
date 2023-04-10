import { createReducer, on } from '@ngrx/store';
import { ExpenseState, initialExpenseState, adapter } from './expense.entity';
import * as ExpenseActions from './expense.actions';

export interface MyExpenseState {
  expense: ExpenseState;
  loading: boolean;
}

export const initialState: MyExpenseState = {
  expense: initialExpenseState,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(ExpenseActions.addTransaction, (state): MyExpenseState => ({ ...state, loading: true })),
  on(ExpenseActions.addTransactionFailed, (state): MyExpenseState => ({ ...state, loading: false })),
  on(
    ExpenseActions.addTransactionSuccess,
    (state, { transaction }): MyExpenseState => ({
      ...state,
      loading: false,
      expense: adapter.addOne(transaction, state.expense)
    })
  )
);
