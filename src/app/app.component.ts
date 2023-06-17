import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { RootState } from './store';
import { MenuComponent } from './common/components/menu/menu.component';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as SettingsActions from '@store/settings/settings.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, MenuComponent]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.dispatchInitialActions();
  }

  private dispatchInitialActions(): void {
    setTimeout(() => {
      this.store.dispatch(TransactionActions.setTransactions());
      this.store.dispatch(TransactionActions.setCategories());
      this.store.dispatch(SettingsActions.setDefaultTheme());
      this.store.dispatch(SettingsActions.fetchCountryInfo());
      this.store.dispatch(SettingsActions.setDefaultCurrency());
    });
  }
}
