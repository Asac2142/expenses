import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TransactionType } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() expenseSelected = new EventEmitter<TransactionType>();
  @Output() incomeSelected = new EventEmitter<TransactionType>();
}
