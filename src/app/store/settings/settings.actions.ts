import { createAction, props } from '@ngrx/store';
import { CountryInformation } from 'src/app/common/models/country.model';
import { SchemeColor } from 'src/app/common/models/transaction.model';

export const setColorScheme = createAction('[SETTINGS] Set Color Theme', props<{ scheme: SchemeColor }>());
export const setColorSchemeSuccess = createAction('[SETTINGS] Set Color Theme Success', props<{ scheme: SchemeColor }>());
export const setColorSchemeFail = createAction('[SETTINGS] Set Color Theme Failed');

export const setDefaultTheme = createAction('[SETTINGS] Set Default Color Theme');
export const setDefaultThemeSuccess = createAction(
  '[SETTINGS] Set Default Color Theme Success',
  props<{ scheme: SchemeColor }>()
);
export const setDefaultThemeFail = createAction(
  '[SETTINGS] Set Default Color Theme As Light',
  props<{ scheme: SchemeColor }>()
);

export const fetchCountryInfo = createAction('[SETTINGS] Fetch Country Info');
export const fetchCountryInfoSuccess = createAction(
  '[SETTINGS] Fetch Country Info Success',
  props<{ info: CountryInformation[] }>()
);
export const fetchCountryInfoFail = createAction('[SETTINGS] Fetch Country Info Failed');

export const setCurrency = createAction('[SETTINGS] Set Currency', props<{ symbol: string }>());
export const setCurrencySuccess = createAction('[SETTINGS] Set Currency Success', props<{ symbol: string }>());
export const setCurrencyFail = createAction('[SETTINGS] Set Currency Failed');

export const setDefaultCurrency = createAction('[SETTINGS] Set Default Currency');
export const setDefaultCurrencySuccess = createAction(
  '[SETTINGS] Set Default Currency Success',
  props<{ symbol: string }>()
);
export const setDefaultCurrencyFail = createAction(
  '[SETTINGS] Set Default Currency as USD ($)',
  props<{ symbol: string }>()
);
