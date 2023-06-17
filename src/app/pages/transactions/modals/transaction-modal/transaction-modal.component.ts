import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';

import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { HeaderComponent } from './header/header.component';
import { formatIonDate } from 'src/app/common/utils/category.utils.data';
import { NumberFormatDirective } from 'src/app/common/directives/number-format.directive';
import { Transaction, TransactionForm, Category, TransactionType } from 'src/app/common/models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderComponent, NumberFormatDirective]
})
export class TransactionModalComponent implements OnInit {
  @Input() transaction!: Transaction | undefined;
  @Input() currencySymbol!: string | undefined;
  transactionForm!: FormGroup<TransactionForm>;
  categorySelected!: Category | null;
  selectedType: TransactionType = 'income';
  private _modal: ModalController = inject(ModalController);
  private _toast: ToastController = inject(ToastController);
  private _alert: AlertController = inject(AlertController);

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
    } else this._modal.dismiss(this.mapToTransaction(), 'update');
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
      this.categorySelected = null;
      this.transactionForm.controls.category.patchValue(null);
    }
    this.selectedType = type;
  }

  async onDelete(): Promise<void> {
    const alert = await this._alert.create({
      header: 'Delete Transaction',
      message: 'You want to delete it?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'confirm', handler: () => this.deleteTransaction() }
      ]
    });

    alert.present();
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

    if (result?.data) {
      this.categorySelected = { ...result.data } as Category;
      this.transactionForm.controls.category.patchValue(this.categorySelected);
    }
  }

  get dateValue() {
    return this.transactionForm.controls.date.value;
  }

  private deleteTransaction(): void {
    this._modal.dismiss(this.transaction?.id, 'delete');
  }

  private mapToTransaction(): Partial<Transaction> {
    const controls = this.transactionForm.controls;
    const dateWithForwardSlashes = controls.date.value!.replace(/-/g, '/');

    return {
      id: this.transaction?.id || undefined,
      amount: +controls.amount.value?.toFixed(2)!,
      category: controls.category.value!,
      dateRegistered: dateWithForwardSlashes,
      description: controls.description.value!,
      type: controls.type.value!
    };
  }

  private initForm(): void {
    const dateFormatted = this.transaction?.dateRegistered
      ? this.transaction.dateRegistered.replace(/\//g, '-')
      : formatIonDate(new Date().toLocaleDateString());

    this.transactionForm = new FormGroup<TransactionForm>({
      amount: new FormControl<number | null>(this.transaction?.amount || null, Validators.required),
      category: new FormControl<Category | null>(this.transaction?.category || null, Validators.required),
      date: new FormControl<string>(dateFormatted, Validators.required),
      description: new FormControl<string>(this.transaction?.description || '', Validators.required),
      type: new FormControl<TransactionType>(this.transaction?.type || 'income', Validators.required)
    });

    if (this.transactionForm.controls.category) this.categorySelected = this.transactionForm.controls.category.value;
  }
}
