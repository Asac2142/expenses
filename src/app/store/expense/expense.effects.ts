import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ExpenseService } from 'src/app/services/expense.service';
import * as TransactionActions from './expense.actions';

@Injectable()
export class ExpenseEffects {
  constructor(private action$: Actions, private expenseService: ExpenseService) {}

  createExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.addTransaction),
      switchMap(({ transaction }) =>
        this.expenseService.createTransaction(transaction).pipe(
          switchMap(response => of(TransactionActions.addTransactionSuccess({ transaction: response }))),
          catchError(() => of(TransactionActions.addTransactionFailed()))
        )
      )
    )
  );
}
