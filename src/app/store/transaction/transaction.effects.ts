import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { TransactionService } from 'src/app/services/transaction.service';
import { RootState } from '..';
import * as TransactionActions from './transaction.actions';
import * as TransactionSelectors from './transaction.selectors';

@Injectable()
export class TransactionEffects {
  constructor(private action$: Actions, private transactionService: TransactionService, private store: Store<RootState>) {}

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
