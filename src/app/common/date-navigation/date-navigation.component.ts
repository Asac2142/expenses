import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-date-navigation',
  templateUrl: './date-navigation.component.html',
  styleUrls: ['./date-navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DateNavigationComponent {
  @Input() date!: string | undefined;
  @Input() identifier!: string;
  @Output() back = new EventEmitter<void>();
  @Output() forward = new EventEmitter<void>();
}
