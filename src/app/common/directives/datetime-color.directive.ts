import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Subscription } from 'rxjs';

import { selectThemeColorScheme } from '@store/settings/settings.selectors';

@Directive({
  selector: '[appDatetimeColor]',
  standalone: true
})
export class DatetimeColorDirective implements OnInit, OnDestroy {
  private _sub = new Subscription();

  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    this._sub.add(
      this._store.select(selectThemeColorScheme).subscribe((scheme: 'dark' | 'light') => {
        const dateTimes = document.querySelectorAll('ion-datetime');

        dateTimes.forEach(dt => {
          if (scheme === 'dark') {
            dt.classList.add('light-color');
            dt.classList.remove('dark-color');
          } else {
            dt.classList.remove('light-color');
            dt.classList.add('dark-color');
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
