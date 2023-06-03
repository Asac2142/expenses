import { Injectable } from '@angular/core';
import { catchError, concatMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { RootState } from '..';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import * as TransactionActions from './transaction.actions';
import * as TransactionSelectors from './transaction.selectors';

@Injectable()
export class TransactionEffects {
  constructor(private action$: Actions, private transactionService: TransactionService, private store: Store<RootState>) {}

  createTransaction$ = createEffect(() =>
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

  updateTransaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.updateTransaction),
      switchMap(({ transaction }) =>
        this.transactionService.updateTransaction(transaction).pipe(
          switchMap(response => of(TransactionActions.updateTransactionSuccess({ transaction: response }))),
          catchError(() => of(TransactionActions.updateTransactionFailed()))
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.deleteTransaction),
      concatMap(({ transactionId }) =>
        this.transactionService.deleteTransaction(transactionId).pipe(
          switchMap(id => of(TransactionActions.deleteTransactionSuccess({ transactionId: id }))),
          catchError(() => of(TransactionActions.deleteTransactionFailed()))
        )
      )
    )
  );

  setTransactions$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.setTransactions),
      switchMap(() =>
        this.transactionService.getTransactionsFromStorage().pipe(
          map(transactions => {
            return transactions?.length
              ? TransactionActions.setTransactionsSuccess({ transactions })
              : TransactionActions.setTransactionsFail();
          }),
          catchError(() => of(TransactionActions.setTransactionsFail()))
        )
      )
    )
  );

  setCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.setCategories),
      switchMap(() =>
        this.transactionService.getCategoriesFromStorage().pipe(
          map(categories => {
            return categories?.length
              ? TransactionActions.setCategoriesSuccess({ categories: categories || [] })
              : TransactionActions.setNoCategoriesFound();
          }),
          catchError(() => of(TransactionActions.setNoCategoriesFound()))
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(TransactionActions.addCategory),
      withLatestFrom(this.store.select(TransactionSelectors.selectAllCategories)),
      switchMap(([{ newCategory }, categories]) =>
        this.transactionService.addCategory(newCategory, categories).pipe(
          map(categrs => TransactionActions.addCategorySuccess({ newCategory: categrs })),
          catchError(() => of(TransactionActions.addCategoryFail()))
        )
      )
    )
  );
}
