import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, map, of, tap } from 'rxjs';

import { RootState } from '@store/index';
import { CurrencieByCountry } from '../../models/country.model';
import { ImgSanatizerPipe } from '../../pipes/img-sanatizer.pipe';
import * as SettingsSelectors from '@store/settings/settings.selectors';
import * as SettingsActions from '@store/settings/settings.actions'

@Component({
  selector: 'app-currency-modal',
  templateUrl: './currency-modal.component.html',
  styleUrls: ['./currency-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ImgSanatizerPipe]
})
export class CurrencyModalComponent implements OnInit {
  private _store = inject(Store<RootState>);
  private _modalCtrl = inject(ModalController);
  private _currencyInfo!: CurrencieByCountry[];
  currencyCountries$!: Observable<CurrencieByCountry[]>;

  ngOnInit() {
    this.currencyCountries$ = this._store
      .select(SettingsSelectors.selectCountryCurrencies)
      .pipe(tap(info => (this._currencyInfo = info)));
  }

  onCancel(): void {
    this._modalCtrl.dismiss();
  }

  onCountrySelected(selected: CurrencieByCountry): void {
    this._store.dispatch(SettingsActions.setCurrency({ symbol: selected.currencySymbol }));
    this._modalCtrl.dismiss();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase() as string;
    this.currencyCountries$ = of(this._currencyInfo).pipe(
      map(countryInfo => countryInfo.filter(c => c.country.toLowerCase().indexOf(value) > -1))
    );
  }

  index(index: number): number {
    return index;
  }
}
