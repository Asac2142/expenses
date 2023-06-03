import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

import { CategoryGroup, Transaction } from 'src/app/common/models/transaction.model';
import { TransactionModalComponent } from '../../transactions/modals/transaction-modal/transaction-modal.component';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as TransactionActions from '@store/transaction/transaction.actions';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailModalComponent {
  @Input() categoryGroup!: CategoryGroup;
  private _modalCtrl = inject(ModalController);
  private _store = inject(Store<RootState>);

  onClose(): void {
    this._modalCtrl.dismiss();
  }

  id(index: number): number {
    return index;
  }

  async onSelected(transaction: Transaction): Promise<void> {
    const modal = await this._modalCtrl.create({ component: TransactionModalComponent, componentProps: { transaction } });
    modal.present();

    const result = await modal.onDidDismiss();
    if (result?.data && result?.role === 'update') this.update(result.data as Transaction);
    if (result.data && result.role === 'delete') this.delete(result.data as string);

    this._modalCtrl.dismiss();
  }

  private update(transaction: Transaction): void {
    this._store.dispatch(TransactionActions.updateTransaction({ transaction }));
  }

  private delete(transactionId: string): void {
    this._store.dispatch(TransactionActions.deleteTransaction({ transactionId }));
  }
}
