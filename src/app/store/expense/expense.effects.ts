import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ExpenseService } from 'src/app/services/expense.service';
import * as ExpenseActions from './expense.actions';

@Injectable()
export class ExpenseEffects {
  constructor(private action$: Actions, private expenseService: ExpenseService) {}

  createExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(ExpenseActions.addTransaction),
      switchMap(({ transaction }) =>
        this.expenseService.createExpense(transaction).pipe(
          switchMap(expense => of(ExpenseActions.addTransactionSuccess({ transaction: expense }))),
          catchError(() => of(ExpenseActions.addTransactionFailed()))
        )
      )
    )
  );
}
