import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category, Transaction, TransactionForm, TransactionType } from '../../models/transaction.model'

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CreateTransactionComponent implements OnChanges {
  @Input() transaction!: Transaction | undefined;
  transactionForm!: FormGroup<TransactionForm>;
  private modal: ModalController = inject(ModalController);

  ngOnChanges(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.modal.dismiss(this.transactionForm.value);
  }

  onCancel(): void {
    this.modal.dismiss(undefined);
  }

  private initForm(): void {
    this.transactionForm = new FormGroup<TransactionForm>({
      amount: new FormControl<number>(this.transaction?.amount || 0),
      category: new FormControl<Category>(this.transaction?.category || 'Enterntaintment'),
      date: new FormControl<string>(this.transaction?.dateRegistered.toLocaleString() || ''),
      description: new FormControl<string>(this.transaction?.description || ''),
      type: new FormControl<TransactionType>(this.transaction?.type || 'expense')
    });
  }
}
