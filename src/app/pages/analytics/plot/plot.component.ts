import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyConfig } from 'src/app/common/models/chart.model';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotCustomLegendComponent } from '../plot-custom-legend/plot-custom-legend.component';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
  standalone: true,
  imports: [CommonModule, PlotlyModule]
})
export class PlotComponent {
  @Input() config!: PlotlyConfig;
  @Input() templateContent!: TemplateRef<PlotCustomLegendComponent>;
}
