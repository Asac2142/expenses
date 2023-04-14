import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CategoryModalComponent {
  private _modal = inject(ModalController);

  onCancel(): void {
    this._modal.dismiss();
  }

  onSave(): void {
    this._modal.dismiss();
  }
}
