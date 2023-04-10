import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';

export const addTransaction = createAction('[TRANSACTION] Add Transaction', props<{ transaction: Partial<Transaction> }>());
export const addTransactionSuccess = createAction(
  '[TRANSACTION] Add Transaction Success',
  props<{ transaction: Transaction }>()
);
export const addTransactionFailed = createAction('[TRANSACTION] Add Transaction Failed');
