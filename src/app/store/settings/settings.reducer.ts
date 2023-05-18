import { createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export interface SettingsState {
  colorScheme: 'dark' | 'light';
}

export const initialState: SettingsState = {
  colorScheme: 'light'
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.setColorScheme, (state, { scheme }): SettingsState => ({ ...state, colorScheme: scheme }))
);
