import { createAction, props } from '@ngrx/store';

export const setColorScheme = createAction('[SETTINGS] Set Color Theme Scheme', props<{ scheme: 'dark' | 'light' }>());
