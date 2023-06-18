import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';

import { RootState } from '@store/index';
import { setColorScheme } from '@store/settings/settings.actions';
import { CurrencyModalComponent } from '../currency-modal/currency-modal.component';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as SettingsSelectors from '@store/settings/settings.selectors';
import * as SettingsActions from '@store/settings/settings.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MenuComponent implements OnInit, OnDestroy {
  protected readonly logoSrc = '../../../../assets/icon/favicon.png';
  private _renderer = inject(Renderer2);
  private _store = inject(Store<RootState>);
  private _alertCtrl = inject(AlertController);
  private _toast = inject(ToastController);
  private _document = inject(DOCUMENT);
  private _modal = inject(ModalController);
  private _sub = new Subscription();
  isChecked = false;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.handleThemeCheck();
    this.loadStore();
  }

  async onErase(): Promise<void> {
    const alert = await this._alertCtrl.create({
      header: 'Erase all data registered in Transactify',
      message: 'Are you sure you want to proceed?',
      buttons: [{ text: 'Erase', handler: () => this.erase() }, { text: 'Cancel' }]
    });

    alert.present();
  }

  onToggle(event: Event): void {
    const toggled = (event as CustomEvent).detail.checked as boolean;
    this.handleThemeClass(toggled);
    this.setTheme(toggled);
  }

  async onCurrencyChange(): Promise<void> {
    const modal = await this._modal.create({ component: CurrencyModalComponent });
    modal.present();
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private handleThemeCheck(): void {
    this._sub.add(
      this._store
        .select(SettingsSelectors.selectThemeColorScheme)
        .pipe(tap(scheme => (this.isChecked = scheme === 'dark')))
        .subscribe(scheme => this.handleThemeClass(scheme === 'dark'))
    );
  }

  private async erase(): Promise<void> {
    this._store.dispatch(TransactionActions.eraseAllData());
    const toast = await this._toast.create({
      message: 'All transactions have been deleted successfully',
      duration: 1500,
      icon: 'trash'
    });
    toast.present();
    this.setDefault();
  }

  private handleThemeClass(toggled: boolean): void {
    toggled ? this._renderer.addClass(this._document.body, 'dark') : this._renderer.removeClass(this._document.body, 'dark');
  }

  private setTheme(toggled: boolean): void {
    this._store.dispatch(setColorScheme({ scheme: toggled ? 'dark' : 'light' }));
  }

  private loadStore(): void {
    this.loading$ = this._store.select(TransactionSelectors.selectLoading);
  }

  private setDefault(): void {
    setTimeout(() => {
      this._store.dispatch(TransactionActions.setTransactions());
      this._store.dispatch(TransactionActions.setCategories());
      this._store.dispatch(SettingsActions.setDefaultTheme());
      this._store.dispatch(SettingsActions.fetchCountryInfo());
      this._store.dispatch(SettingsActions.setDefaultCurrency());
    });
  }
}
