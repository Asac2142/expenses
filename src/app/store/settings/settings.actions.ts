import { createAction, props } from '@ngrx/store';
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
