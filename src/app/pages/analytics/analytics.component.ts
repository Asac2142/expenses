import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { DateNavigationComponent } from '../../common/date-navigation/date-navigation.component';
import { addMonthToDate, subMonthToDate } from 'src/app/common/utils/category.utils.data';
import { RootState } from '@store/index';
import { Observable } from 'rxjs';
import * as TransactionActions from '@store/transaction/transaction.actions';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, DateNavigationComponent]
})
export class AnalyticsComponent implements OnInit {
  private _store = inject(Store<RootState>);
  currentDate$!: Observable<Date>;

  ngOnInit(): void {
    this.currentDate$ = this._store.select(TransactionSelectors.selectCurrentDateSelected);
  }

  back(currentDate: Date | null): void {
    if (currentDate) {
      const monthBack = subMonthToDate(currentDate, 1);
      this._store.dispatch(TransactionActions.setCurrentDate({ date: monthBack }));
    }
  }

  forward(currentDate: Date | null): void {
    if (currentDate) {
      const monthForward = addMonthToDate(currentDate, 1);
      this._store.dispatch(TransactionActions.setCurrentDate({ date: monthForward }));
    }
  }
}
