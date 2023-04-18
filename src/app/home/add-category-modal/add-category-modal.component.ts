import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category, Icon, TransactionType } from 'src/app/models/transaction.model';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as Icons from 'ionicons/icons';
import * as TransactionActions from '../../store/transaction/transaction.actions';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryModalComponent implements OnInit {
  private _modal = inject(ModalController);
  private store = inject(Store);
  private typeSelected: TransactionType = 'expense';
  private iconSelected!: Icon;
  newCategory!: string;
  icons: Icon[] = [];
  iconIndexSelected = -1;

  ngOnInit() {
    this.setAllIcons();
  }

  onSave(): void {
    const newCategory = this.getCategory();
    this.store.dispatch(TransactionActions.addCategory({ newCategory }));
    this._modal.dismiss();
  }

  onCancel(): void {
    this._modal.dismiss();
  }

  areFieldsValid(): boolean {
    return !!this.newCategory && !!this.iconSelected;
  }

  onTypeChange(event: Event): void {
    const typeSelected = (event as CustomEvent).detail.value as TransactionType;
    this.typeSelected = typeSelected;
  }

  iconId(index: number): number {
    return index;
  }

  onIconSelected(icon: Icon, index: number): void {
    this.iconIndexSelected = index;
    this.iconSelected = icon;
  }

  private getCategory(): Category {
    return {
      color: this.typeSelected === 'expense' ? 'danger' : 'success',
      svgContent: this.iconSelected.svg,
      iconName: '',
      label: this.newCategory,
      type: this.typeSelected
    };
  }

  private setAllIcons(): void {
    const keys = Object.keys(Icons);
    const icons: Icon[] = [];
    const data = Icons as any;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const iconSvgContent = data[key] as string;

      if (!key.toLowerCase().includes('sharp')) icons.push({ name: key, svg: iconSvgContent });
    }

    this.icons = [...icons];
  }
}
