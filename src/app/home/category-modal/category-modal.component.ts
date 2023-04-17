import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category, TransactionType } from 'src/app/models/transaction.model';
import { categoryData } from 'src/app/utils/category.utils.data';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';

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
  categories!: Category[];

  ngOnInit(): void {
    this.categories = categoryData.filter(c => c.type === this.transactionType);
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
