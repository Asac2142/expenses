import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { SettingsService } from 'src/app/services/settings/settings.service';
import * as SettingsActions from '@store/settings/settings.actions';

@Injectable()
export class SettingEffects {
  private _actions$ = inject(Actions);
  private _settingsService = inject(SettingsService);

  setColorTheme$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.setColorScheme),
      switchMap(({ scheme }) =>
        this._settingsService.setThemeColor(scheme).pipe(
          switchMap(() => of(SettingsActions.setColorSchemeSuccess({ scheme }))),
          catchError(() => of(SettingsActions.setColorSchemeFail()))
        )
      )
    )
  );

  setDefaultTheme$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.setDefaultTheme),
      switchMap(() =>
        this._settingsService.getThemeColor().pipe(
          switchMap(scheme => of(SettingsActions.setDefaultThemeSuccess({ scheme }))),
          catchError(() => of(SettingsActions.setDefaultThemeFail({ scheme: 'light' })))
        )
      )
    )
  );

  fetchCountriesInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.fetchCountryInfo),
      switchMap(() =>
        this._settingsService.fetchCountryInformation().pipe(
          switchMap(info => of(SettingsActions.fetchCountryInfoSuccess({ info }))),
          catchError(() => of(SettingsActions.fetchCountryInfoFail()))
        )
      )
    )
  );

  setDefaultCurrency$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.setDefaultCurrency),
      switchMap(() =>
        this._settingsService.getCurrency().pipe(
          switchMap(symbol => of(SettingsActions.setDefaultCurrencySuccess({ symbol }))),
          catchError(() => of(SettingsActions.setDefaultCurrencyFail({ symbol: '$' })))
        )
      )
    )
  );

  setCurrencySymbol$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.setCurrency),
      switchMap(({ symbol }) =>
        this._settingsService.setCurrencySymbol(symbol).pipe(
          switchMap(response => of(SettingsActions.setCurrencySuccess({ symbol: response }))),
          catchError(() => of(SettingsActions.setCurrencyFail()))
        )
      )
    )
  );
}
