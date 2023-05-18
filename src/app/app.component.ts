import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { RootState } from './store';
import { setColorScheme } from '@store/settings/settings.actions';
import * as TransactionActions from '@store/transaction/transaction.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<RootState>) {
    const getPreferredScheme = () => (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light');
    const colorScheme = getPreferredScheme() as 'dark' | 'light';
    this.store.dispatch(setColorScheme({ scheme: colorScheme }));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(TransactionActions.setTransactions());
      this.store.dispatch(TransactionActions.setCategories());
    });
  }
}
