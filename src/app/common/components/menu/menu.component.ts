import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';

import { RootState } from '@store/index';
import { setColorScheme } from '@store/settings/settings.actions';
import { TransactionState } from '@store/transaction/transaction.reducer';
import { SettingsState } from '@store/settings/settings.reducer';
import { createFile, readFile } from '../../utils/category.utils.data';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';
import * as SettingsSelectors from '@store/settings/settings.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MenuComponent implements OnInit, OnDestroy {
  protected logoSrc = '../../../../assets/icon/favicon.png';
  private _renderer = inject(Renderer2);
  private _store = inject(Store<RootState>);
  private _alertCtrl = inject(AlertController);
  private _toast = inject(ToastController);
  private _sub = new Subscription();
  private _transactions!: TransactionState;
  private _settings!: SettingsState;
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

  async onBackup(): Promise<void> {
    const data: RootState = { transactions: this._transactions, settings: this._settings };
    createFile(data, this._toast);
  }

  async onRestore(): Promise<void> {
    const fileContent = await readFile();

    if (fileContent?.data !== undefined && fileContent?.data !== null) {
      const state: RootState = JSON.parse(fileContent.data);
      const { transactions, settings } = state;

      this._store.dispatch(TransactionActions.setState({ transactionsState: transactions }));
      this._store.dispatch(setColorScheme({ scheme: settings.colorScheme }));
      const toast = await this._toast.create({
        message: 'Data has been restored',
        duration: 2000,
        icon: 'checkmark-outline'
      });
      toast.present();
    }
  }

  onToggle(event: Event): void {
    const toggled = (event as CustomEvent).detail.checked as boolean;
    this.handleThemeClass(toggled);
    this.setTheme(toggled);
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
  }

  private handleThemeClass(toggled: boolean): void {
    toggled ? this._renderer.addClass(document.body, 'dark') : this._renderer.removeClass(document.body, 'dark');
  }

  private setTheme(toggled: boolean): void {
    this._store.dispatch(setColorScheme({ scheme: toggled ? 'dark' : 'light' }));
  }

  private loadStore(): void {
    this._sub.add(
      this._store
        .select(TransactionSelectors.selectTransactions)
        .subscribe(transactions => (this._transactions = transactions))
    );

    this._sub.add(this._store.select(SettingsSelectors.selectSettings).subscribe(settings => (this._settings = settings)));
    this.loading$ = this._store.select(TransactionSelectors.selectLoading);
  }
}
