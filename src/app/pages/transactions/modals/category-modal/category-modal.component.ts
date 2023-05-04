import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Observable, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { Category, TransactionType } from 'src/app/common/models/transaction.model';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';
import * as TransactionSelectors from '@store/transaction/transaction.selectors';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryModalComponent implements OnInit {
  @Input() transactionType!: TransactionType;
  private _modal = inject(ModalController);
  private store = inject(Store);
  private _categories!: Category[];
  categories$!: Observable<Category[]>;

  ngOnInit(): void {
    this.categories$ = this.store
      .select(TransactionSelectors.selectCategories(this.transactionType))
      .pipe(tap(categories => (this._categories = categories)));
  }

  onSelected(category: Category): void {
    this._modal.dismiss(category);
  }

  onSearchCategory(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase() as string;
    this.categories$ = of(this._categories).pipe(
      map(categories => categories.filter(c => c.label.toLowerCase().indexOf(value) > -1))
    );
  }

  onCancel(): void {
    this._modal.dismiss();
  }

  categoryIndex(index: number): number {
    return index;
  }

  async onAddCategory(): Promise<void> {
    const categoryAddModal = await this._modal.create({ component: AddCategoryModalComponent });
    categoryAddModal.present();
  }
}
