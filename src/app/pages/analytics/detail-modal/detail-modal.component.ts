import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryGroup } from 'src/app/common/models/transaction.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailModalComponent {
  @Input() categoryGroup!: CategoryGroup;
  private _modalCtrl = inject(ModalController);

  onClose(): void {
    this._modalCtrl.dismiss();
  }

  id(index: number): number {
    return index;
  }
}
