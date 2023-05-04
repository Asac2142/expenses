import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Balance, Transaction } from 'src/app/common/models/transaction.model';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceDetailComponent {
  @Input() transactions!: Map<string, Transaction[]>;
  @Input() balance!: Balance;
}
