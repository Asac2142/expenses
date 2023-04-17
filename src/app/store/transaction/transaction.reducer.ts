import { createReducer, on } from '@ngrx/store';
import { ExpenseState, initialExpenseState, adapter } from './transaction.entity';
import * as ExpenseActions from './transaction.actions';
import { Category } from 'src/app/models/transaction.model';
import { categoryData } from 'src/app/utils/category.utils.data';

export interface TransactionState {
  expense: ExpenseState;
  loading: boolean;
  categories: Category[];
}

export const initialState: TransactionState = {
  expense: initialExpenseState,
  loading: false,
  categories: categoryData
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
