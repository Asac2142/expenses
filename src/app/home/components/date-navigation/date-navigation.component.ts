import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-date-navigation',
  templateUrl: './date-navigation.component.html',
  styleUrls: ['./date-navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DateNavigationComponent {
  @Output() back = new EventEmitter<void>();
  @Output() forward = new EventEmitter<void>();
  @ViewChild('datepicker', { read: ElementRef }) datePicker!: ElementRef;
}
