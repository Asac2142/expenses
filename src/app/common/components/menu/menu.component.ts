import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { RootState } from '@store/index';
import { setColorScheme } from '@store/settings/settings.actions';
import { selectThemeColorScheme } from '@store/settings/settings.selectors';

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

  onToggle(event: Event): void {
    const toggled = (event as CustomEvent).detail.checked as boolean;
    this.handleThemeClass(toggled);
    this.setTheme(toggled);
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
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
