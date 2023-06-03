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
}
