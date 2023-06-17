import { createReducer, on } from '@ngrx/store';

import { SchemeColor } from 'src/app/common/models/transaction.model';
import { CountryInformation } from 'src/app/common/models/country.model';
import * as SettingsActions from './settings.actions';

export interface SettingsState {
  colorScheme: SchemeColor;
  countryInfo: CountryInformation[];
  currency: string;
  loading: boolean;
}

export const initialState: SettingsState = {
  colorScheme: 'light',
  countryInfo: [],
  currency: '$',
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.setColorScheme, (state): SettingsState => ({ ...state, loading: true })),
  on(
    SettingsActions.setColorSchemeSuccess,
    (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme, loading: false })
  ),
  on(SettingsActions.setColorSchemeFail, (state): SettingsState => ({ ...state, loading: false })),
  on(SettingsActions.setDefaultTheme, (state): SettingsState => ({ ...state, loading: true })),
  on(
    SettingsActions.setDefaultThemeSuccess,
    (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme, loading: false })
  ),
  on(
    SettingsActions.setDefaultThemeFail,
    (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme, loading: false })
  ),
  on(SettingsActions.fetchCountryInfo, (state): SettingsState => ({ ...state, loading: true })),
  on(
    SettingsActions.fetchCountryInfoSuccess,
    (state, { info }): SettingsState => ({ ...state, countryInfo: info, loading: false })
  ),
  on(SettingsActions.fetchCountryInfoFail, (state): SettingsState => ({ ...state, loading: false })),
  on(SettingsActions.setCurrency, (state): SettingsState => ({ ...state, loading: true })),
  on(
    SettingsActions.setCurrencySuccess,
    (state, { symbol }): SettingsState => ({ ...state, currency: symbol, loading: false })
  ),
  on(SettingsActions.setCurrency, (state): SettingsState => ({ ...state, loading: false })),
  on(SettingsActions.setDefaultCurrency, (state): SettingsState => ({ ...state, loading: true })),
  on(
    SettingsActions.setDefaultCurrencySuccess,
    (state, { symbol }): SettingsState => ({ ...state, loading: false, currency: symbol })
  ),
  on(
    SettingsActions.setDefaultCurrencyFail,
    (state, { symbol }): SettingsState => ({ ...state, loading: false, currency: symbol })
  )
);
