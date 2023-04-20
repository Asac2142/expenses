import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

import { Category, Transaction, TransactionForm, TransactionType } from '../../models/transaction.model';
import { formatDate } from 'src/app/utils/category.utils.data';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderComponent]
})
export class CreateTransactionComponent implements OnInit {
  @Input() transaction!: Transaction | undefined;
  transactionForm!: FormGroup<TransactionForm>;
  categorySelected!: Category | undefined;
  selectedType: TransactionType = 'income';
  private _modal: ModalController = inject(ModalController);
  private _toast: ToastController = inject(ToastController);

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      const toast = await this._toast.create({
        message: 'Some fields are required or invalid',
        duration: 1500,
        position: 'bottom',
        icon: 'eye',
        color: 'danger'
      });
      toast.present();
    } else this._modal.dismiss(this.transactionForm.value);
  }

  onCancel(): void {
    this._modal.dismiss(undefined);
  }

  onDateChange(event: Event): void {
    const date = (event as CustomEvent).detail.value as string;
    this.transactionForm.controls.date.patchValue(date);
  }

  validateCategory(): boolean {
    const controls = this.transactionForm.controls;
    return controls.category?.invalid && controls.category.touched && !this.categorySelected;
  }

  setTypeSelected(type: TransactionType): void {
    if (type !== this.selectedType) {
      this.categorySelected = undefined;
      this.transactionForm.controls.category.patchValue(null);
    }
    this.selectedType = type;
  }

  async onSelectCategory(): Promise<void> {
    this.transactionForm.controls.category.markAsTouched();
    const transactionType: TransactionType = this.transactionForm.controls.type.value || 'expense';
    const modalComponent = await this._modal.create({
      component: CategoryModalComponent,
      componentProps: { transactionType }
    });

    modalComponent.present();
    const result = await modalComponent.onWillDismiss();

    if (result.data) {
      this.categorySelected = result.data as Category;
      this.transactionForm.controls.category.patchValue(this.categorySelected);
    }
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