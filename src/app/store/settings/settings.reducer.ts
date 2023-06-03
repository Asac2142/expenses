import { createReducer, on } from '@ngrx/store';
import { SchemeColor } from 'src/app/common/models/transaction.model';
import * as SettingsActions from './settings.actions';

export interface SettingsState {
  colorScheme: SchemeColor;
}

export const initialState: SettingsState = {
  colorScheme: 'light'
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.setColorScheme, (state): SettingsState => ({ ...state })),
  on(SettingsActions.setColorSchemeSuccess, (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme })),
  on(SettingsActions.setColorSchemeFail, (state): SettingsState => ({ ...state })),
  on(SettingsActions.setDefaultTheme, (state): SettingsState => ({ ...state })),
  on(SettingsActions.setDefaultThemeSuccess, (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme })),
  on(SettingsActions.setDefaultThemeFail, (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme }))
);
