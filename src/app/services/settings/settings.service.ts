import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';

import { CountryInformation } from 'src/app/common/models/country.model';
import { SchemeColor } from 'src/app/common/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _storage!: Storage;
  private readonly _colorTheme = 'theme';
  private readonly _countryInfoPath = '../../../assets/country-info.json';
  private readonly _currencyKey = 'currency';

  constructor(private storage: Storage, private http: HttpClient) {
    this.initStorage();
  }

  setThemeColor(scheme: SchemeColor): Observable<boolean> {
    this.setColorScheme(scheme);
    return of(true);
  }

  getCurrency(): Observable<string> {
    return from(this.getCurrencySymbol());
  }

  setCurrencySymbol(symbol: string): Observable<string> {
    this.setCurrency(symbol);
    return of(symbol);
  }

  getThemeColor(): Observable<SchemeColor> {
    return from(this.getThemeColorFromStorage());
  }

  fetchCountryInformation(): Observable<CountryInformation[]> {
    return this.http.get<CountryInformation[]>(this._countryInfoPath);
  }

  private async getThemeColorFromStorage(): Promise<SchemeColor> {
    const existThemeColorDefined = (await this._storage.get(this._colorTheme)) as SchemeColor | undefined;

    if (existThemeColorDefined) return existThemeColorDefined;
    else {
      this.setColorScheme('light');
      return 'light';
    }
  }

  private async getCurrencySymbol(): Promise<string> {
    const existCurrencySymbol = (await this._storage.get(this._currencyKey)) as string | undefined;

    if (existCurrencySymbol) return existCurrencySymbol;
    else {
      this.setCurrency('$');
      return '$';
    }
  }

  private async setColorScheme(scheme: SchemeColor): Promise<void> {
    await this._storage.set(this._colorTheme, scheme);
  }

  private async setCurrency(symbol: string): Promise<void> {
    await this._storage.set(this._currencyKey, symbol);
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }
}
