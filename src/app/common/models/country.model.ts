export interface CurrencieByCountry {
  country: string;
  currencySymbol: string;
  flagUrl: string;
}

export interface CountryInformation {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  subregion: string;
  region: string;
  population: number;
  demonym: string;
  timezones: string[];
  nativeName: string;
  numericCode: string;
  flags: Flags;
  languages: Language[];
  translations: Translations;
  flag: string;
  altSpellings?: string[];
  latlng?: number[];
  area?: number;
  borders?: string[];
  currencies?: Currency[];
  capital?: string;
  regionalBlocs?: RegionalBloc[];
  cioc?: string;
  independent: boolean;
  gini?: number;
}

export interface Flags {
  svg: string;
  png: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_2: string;
  name: string;
  iso639_1?: string;
  nativeName?: string;
}

export interface Translations {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
  fa?: string;
}

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherNames?: string[];
  otherAcronyms?: string[];
}
