import { createAction, props } from '@ngrx/store';
import { Category, Transaction } from '../../common/models/transaction.model';

export const addTransaction = createAction('[TRANSACTION] Add Transaction', props<{ transaction: Partial<Transaction> }>());
export const addTransactionSuccess = createAction(
  '[TRANSACTION] Add Transaction Success',
  props<{ transaction: Transaction }>()
);
export const addTransactionFailed = createAction('[TRANSACTION] Add Transaction Failed');

export const updateTransaction = createAction('[TRANSACTION] Update Transaction', props<{ transaction: Transaction }>())
export const updateTransactionSuccess = createAction('[TRANSACTION] Update Transaction Success', props<{ transaction: Transaction }>())
export const updateTransactionFailed = createAction('[TRANSACTION] Update Transaction Failed');

export const deleteTransaction = createAction('[TRANSACTION] Delete Transacion', props<{ transactionId: string }>());
export const deleteTransactionSuccess = createAction('[TRANSACTION] Delete Transaction Success', props<{ transactionId: string }>());
export const deleteTransactionFailed = createAction('[TRANSACTION] Delete Transaction Failed');

export const addCategory = createAction('[TRANSACTION] Add Category', props<{ newCategory: Category }>());
export const addCategorySuccess = createAction('[TRANSACTION] Add Category Success', props<{ newCategory: Category[] }>());
export const addCategoryFail = createAction('[TRANSACTION] Add Category Fail');

export const setTransactions = createAction('[TRANSACTION] Set Transactions');
export const setTransactionsSuccess = createAction(
  '[TRANSACTION] Set Transactions From Storage Success',
  props<{ transactions: Transaction[] }>()
);
export const setTransactionsFail = createAction('[TRANSACTION] No Transactions Data Found');

export const setCategories = createAction('[TRANSACTION] Set Categories');
export const setCategoriesSuccess = createAction(
  '[TRANSACTION] Set Category Data From Storage',
  props<{ categories: Category[] }>()
);
export const setNoCategoriesFound = createAction('[TRANSACTION] No Categories Found');

export const setCurrentDate = createAction('[TRANSACTION] Set Current Date', props<{ date: Date }>());
