import { createReducer, on } from '@ngrx/store';
import { TransactionStateEntity, initialTransactionState, adapter } from './transaction.entity';
import * as TransactionActions from './transaction.actions';
import { Category } from 'src/app/models/transaction.model';
import { categoryData } from 'src/app/utils/category.utils.data';

export interface TransactionState {
  transaction: TransactionStateEntity;
  loading: boolean;
  categories: Category[];
}

export const initialState: TransactionState = {
  transaction: initialTransactionState,
  loading: false,
  categories: categoryData
};

export const reducer = createReducer(
  initialState,
  on(TransactionActions.addTransaction, (state): TransactionState => ({ ...state, loading: true })),
  on(TransactionActions.addTransactionFailed, (state): TransactionState => ({ ...state, loading: false })),
  on(
    TransactionActions.addTransactionSuccess,
    (state, { transaction }): TransactionState => ({
      ...state,
      loading: false,
      transaction: adapter.addOne(transaction, state.transaction)
    })
  ),
  on(TransactionActions.addCategory, (state): TransactionState => ({ ...state })),
  on(
    TransactionActions.addCategorySuccess,
    (state, { newCategory }): TransactionState => ({ ...state, categories: newCategory })
  ),
  on(TransactionActions.setCategories, (state): TransactionState => ({ ...state })),
  on(
    TransactionActions.setCategoriesSuccess,
    (state, { categories }): TransactionState => ({
      ...state,
      categories: [...categories]
    })
  ),
  on(TransactionActions.setNoCategoriesFound, (state): TransactionState => ({ ...state }))
);
