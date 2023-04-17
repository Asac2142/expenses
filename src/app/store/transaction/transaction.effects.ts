import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TransactionService } from 'src/app/services/transaction.service';
import * as TransactionActions from './transaction.actions';

@Injectable()
export class TransactionEffects {
  constructor(private action$: Actions, private transactionService: TransactionService) {}

  createExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.addTransaction),
      switchMap(({ transaction }) =>
        this.transactionService.createTransaction(transaction).pipe(
          switchMap(response => of(TransactionActions.addTransactionSuccess({ transaction: response }))),
          catchError(() => of(TransactionActions.addTransactionFailed()))
        )
      )
    )
  );
}
