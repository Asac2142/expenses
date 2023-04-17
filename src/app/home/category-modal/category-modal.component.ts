import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category, TransactionType } from 'src/app/models/transaction.model';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TransactionSelectors from '../../store/transaction/transaction.selectors';

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
  categories$!: Observable<Category[]>;

  ngOnInit(): void {
    this.categories$ = this.store.select(TransactionSelectors.selectCategories(this.transactionType));
  }

  onSelected(category: Category): void {
    console.log('Category: ', category);
    this._modal.dismiss(category);
  }

  onCancel(): void {
    this._modal.dismiss();
  }

  categoryIndex(index: number): number {
    return index;
  }

  async onAddCategory(): Promise<void> {
    // TODO - open another modal for adding a custom category
    console.log('add category');
    const categoryAddModal = await this._modal.create({ component: AddCategoryModalComponent });
    categoryAddModal.present();

  }
}
