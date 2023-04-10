import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from '../../models/transaction.model';

export interface ExpenseState extends EntityState<Transaction> {}
export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();
export const initialExpenseState: ExpenseState = adapter.getInitialState();
