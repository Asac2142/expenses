import { createSelector } from '@ngrx/store';
import * as index from '../index';

export const settingsSliceState = (state: index.RootState) => state.settings;
export const selectSettings = createSelector(settingsSliceState, (state) => state);
export const selectThemeColorScheme = createSelector(settingsSliceState, state => state.colorScheme);
