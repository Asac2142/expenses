import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { DateNavigationComponent } from '../../common/components/date-navigation/date-navigation.component';
import { addMonthToDate, subMonthToDate } from 'src/app/common/utils/category.utils.data';
import { RootState } from '@store/index';
import { Observable, tap } from 'rxjs';
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
  @ViewChild('datepicker', { read: ElementRef }) datePicker!: ElementRef;
  currentDate$!: Observable<Date>;

  ngOnInit(): void {
    console.log('ANALITYCICS')
    this.currentDate$ = this._store.select(TransactionSelectors.selectCurrentDateSelected).pipe(tap((d) => console.log('Analytics component: ', d)));
  }

  back(currentDate: Date | null): void {
    if (currentDate) {
      const monthBack = subMonthToDate(currentDate, 1);
      const datePicker = this.datePicker.nativeElement as IonDatetime;
      datePicker.value = monthBack.toISOString();
      this._store.dispatch(TransactionActions.setCurrentDate({ date: monthBack }));
    }
  }

  forward(currentDate: Date | null): void {
    if (currentDate) {
      const monthForward = addMonthToDate(currentDate, 1);
      const datePicker = this.datePicker.nativeElement as IonDatetime;
      datePicker.value = monthForward.toISOString();
      this._store.dispatch(TransactionActions.setCurrentDate({ date: monthForward }));
    }
  }
}
