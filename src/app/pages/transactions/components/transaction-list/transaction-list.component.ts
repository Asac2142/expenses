import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Transaction } from 'src/app/common/models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnChanges {
  @Input() transactions!: Map<string, Transaction[]>;
  @Output() transactionSelected = new EventEmitter<Transaction>();
  transactionDates: string[] = [];

  ngOnChanges(): void {
    this.transactionDates = [...this.transactions.keys()];
  }

  dateId(index: number): number {
    return index;
  }

  transactionIndex(index: number): number {
    return index;
  }
}
