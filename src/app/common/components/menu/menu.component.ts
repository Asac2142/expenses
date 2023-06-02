import { CommonModule } from '@angular/common';
import { Component, Renderer2, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { RootState } from '@store/index';
import { setColorScheme } from '@store/settings/settings.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MenuComponent {
  protected logoSrc = '../../../../assets/icon/favicon.png';
  private _renderer = inject(Renderer2);
  private _store = inject(Store<RootState>);

  onToggle(event: Event): void {
    const toggled = (event as CustomEvent).detail.checked as boolean;
    toggled
      ? this._renderer.setAttribute(document.body, 'color-theme', 'dark')
      : this._renderer.setAttribute(document.body, 'color-theme', 'light');

    this.setTheme(toggled);
  }

  private setTheme(toggled: boolean): void {
    this._store.dispatch(setColorScheme({ scheme: toggled ? 'dark' : 'light' }));
  }
}
