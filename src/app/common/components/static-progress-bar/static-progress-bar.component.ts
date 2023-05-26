import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-static-progress-bar',
  templateUrl: './static-progress-bar.component.html',
  styleUrls: ['./static-progress-bar.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticProgressBarComponent {
  @Input() progress!: number;
  @Input() color!: string;
}
