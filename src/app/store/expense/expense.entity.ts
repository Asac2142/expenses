import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Expense } from 'src/app/models/expense.model';

export interface ExpenseState extends EntityState<Expense> {}
export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>();
export const initialExpenseState: ExpenseState = adapter.getInitialState();
