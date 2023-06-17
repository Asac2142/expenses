import { createSelector } from '@ngrx/store';

import { CountryInformation, CurrencieByCountry } from 'src/app/common/models/country.model';
import * as index from '../index';

export const settingsSliceState = (state: index.RootState) => state.settings;
export const selectSettings = createSelector(settingsSliceState, state => state);
export const selectThemeColorScheme = createSelector(settingsSliceState, state => state.colorScheme);
export const selectCurrentCurrency = createSelector(settingsSliceState, state => state.currency);
export const selectCountryCurrencies = createSelector(settingsSliceState, state =>
  formatCountriesCurrency(state.countryInfo)
);

function formatCountriesCurrency(countryInfo: CountryInformation[]): CurrencieByCountry[] {
  const currencyInfo: CurrencieByCountry[] = [];

  for (let i = 0; i < countryInfo.length; i++) {
    const countryData = countryInfo[i];
    const data: CurrencieByCountry = {
      country: countryData.name,
      currencySymbol: countryData?.currencies?.[0]?.symbol || '$',
      flagUrl: countryData.flag
    };

    currencyInfo.push(data);
  }

  return currencyInfo;
}
