import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const addTransaction = createAction('[EXPENSE] Add Transaction', props<{ transaction: Partial<Expense> }>());
export const addTransactionSuccess = createAction('[EXPENSE] Add Transaction Success', props<{ transaction: Expense }>());
export const addTransactionFailed = createAction('[EXPENSE] Add Transaction Failed');
