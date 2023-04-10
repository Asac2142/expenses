import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnChanges {
  @Input() transactions!: (Transaction | undefined)[];

  ngOnChanges(): void {}
}
