import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Icon, TransactionType } from 'src/app/models/transaction.model';
import { FormsModule } from '@angular/forms';
import * as Icons from 'ionicons/icons';

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
  private typeSelected: TransactionType = 'expense';
  private iconSelected!: Icon;
  newCategory!: string;
  icons: Icon[] = [];
  iconIndexSelected = -1;

  ngOnInit() {
    const keys = Object.keys(Icons);
    const icons: Icon[] = [];
    const data = Icons as any;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const iconSvgContent = data[key] as string;
      icons.push({ name: key, svg: iconSvgContent });
    }

    this.icons = [...icons];
  }

  onSave(): void {
    console.log('typeSelected: ', this.typeSelected);
    console.log('Icon selected: ', this.iconSelected);
    console.log('category: ', this.newCategory);
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
}
