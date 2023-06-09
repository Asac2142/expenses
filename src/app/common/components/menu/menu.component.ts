import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { RootState } from '@store/index';
import { setColorScheme } from '@store/settings/settings.actions';
import { selectThemeColorScheme } from '@store/settings/settings.selectors';
import * as TransactionActions from '@store/transaction/transaction.actions';
import { createFile, readFile } from '../../utils/category.utils.data';

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
  isChecked = false;

  ngOnInit(): void {
    this._sub.add(
      this._store
        .select(selectThemeColorScheme)
        .pipe(tap(scheme => (this.isChecked = scheme === 'dark')))
        .subscribe(scheme => this.handleThemeClass(scheme === 'dark'))
    );
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
    createFile();
    const toast = await this._toast.create({ message: 'File was created successfully', duration: 1500 });
    toast.present();
  }

  async onRestore(): Promise<void> {
    console.log('restore');
    const d = await readFile();
    const t = await this._toast.create({ message: d.data });
    t.present();
  }

  onToggle(event: Event): void {
    const toggled = (event as CustomEvent).detail.checked as boolean;
    this.handleThemeClass(toggled);
    this.setTheme(toggled);
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private async erase(): Promise<void> {
    this._store.dispatch(TransactionActions.eraseAllData());
    const toast = await this._toast.create({ message: 'All transactions have been deleted successfully', duration: 1500 });
    toast.present();
  }

  private handleThemeClass(toggled: boolean): void {
    toggled
      ? this._renderer.setAttribute(document.body, 'color-theme', 'dark')
      : this._renderer.setAttribute(document.body, 'color-theme', 'light');
  }

  private setTheme(toggled: boolean): void {
    this._store.dispatch(setColorScheme({ scheme: toggled ? 'dark' : 'light' }));
  }
}
