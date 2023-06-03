import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';

import { SchemeColor } from 'src/app/common/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _storage!: Storage;
  private readonly _colorTheme = 'theme';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  setThemeColor(scheme: SchemeColor): Observable<boolean> {
    this.setColorScheme(scheme);
    return of(true);
  }

  getThemeColor(): Observable<SchemeColor> {
    return from(this.getThemeColorFromStorage());
  }

  private async getThemeColorFromStorage(): Promise<SchemeColor> {
    const existThemeColorDefined = (await this._storage.get(this._colorTheme)) as SchemeColor | undefined;

    if (existThemeColorDefined) return existThemeColorDefined;
    else {
      this.setColorScheme('light');
      return 'light';
    }
  }

  private async setColorScheme(scheme: SchemeColor): Promise<void> {
    await this._storage.set(this._colorTheme, scheme);
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }
}
