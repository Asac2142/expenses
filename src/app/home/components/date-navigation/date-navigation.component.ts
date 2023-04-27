import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-date-navigation',
  templateUrl: './date-navigation.component.html',
  styleUrls: ['./date-navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DateNavigationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
}
