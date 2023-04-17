import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category, Transaction, TransactionForm, TransactionType } from '../../models/transaction.model';
import { formatDate } from 'src/app/utils/category.utils.data';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CreateTransactionComponent implements OnInit {
  @Input() transaction!: Transaction | undefined;
  transactionForm!: FormGroup<TransactionForm>;
  private _modal: ModalController = inject(ModalController);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this._modal.dismiss(this.transactionForm.value);
  }

  onCancel(): void {
    this._modal.dismiss(undefined);
  }

  onDateChange(event: Event): void {
    const date = (event as CustomEvent).detail.value as string;
    this.transactionForm.controls.date.patchValue(date);
  }

  async onClick(): Promise<void> {
    const transactionType: TransactionType = this.transactionForm.controls.type.value || 'expense';
    const modalComponent = await this._modal.create({
      component: CategoryModalComponent,
      componentProps: { transactionType }
    });
    await modalComponent.present();
  }

  get dateValue() {
    return this.transactionForm.controls.date.value;
  }

  private initForm(): void {
    const dateFormatted = formatDate(
      this.transaction?.dateRegistered.toLocaleDateString() || new Date().toLocaleDateString()
    );

    this.transactionForm = new FormGroup<TransactionForm>({
      amount: new FormControl<number | null>(this.transaction?.amount || null, Validators.required),
      category: new FormControl<Category | null>(this.transaction?.category || null, Validators.required),
      date: new FormControl<string>(dateFormatted, Validators.required),
      description: new FormControl<string>(this.transaction?.description || '', Validators.required),
      type: new FormControl<TransactionType>(this.transaction?.type || 'income', Validators.required)
    });
  }
}
