import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlotlyConfig } from 'src/app/common/models/chart.model';
import { CategoryGroup } from 'src/app/common/models/transaction.model';
import { PlotComponent } from '../plot/plot.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlotCustomLegendComponent } from '../plot-custom-legend/plot-custom-legend.component';

@Component({
  selector: 'app-plot-detail',
  templateUrl: './plot-detail.component.html',
  styleUrls: ['./plot-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, PlotComponent, PlotCustomLegendComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotDetailComponent {
  @Input() plotConfig!: PlotlyConfig;
  @Input() colors!: string[];
  @Input() transactionDetailMap!: Map<string, CategoryGroup>;
  @Input() message!: string;
  @Output() detailSelected = new EventEmitter<CategoryGroup>();
}
