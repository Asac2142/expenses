import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StaticProgressBarComponent } from 'src/app/common/components/static-progress-bar/static-progress-bar.component';
import { CategoryGroup } from 'src/app/common/models/transaction.model';

@Component({
  selector: 'app-plot-custom-legend',
  templateUrl: './plot-custom-legend.component.html',
  styleUrls: ['./plot-custom-legend.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, StaticProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotCustomLegendComponent implements OnChanges{
  @Input() detail!: Map<string, CategoryGroup>;
  @Input() colors!: string[];
  @Output() detailSelected = new EventEmitter<CategoryGroup>();
  categories: CategoryGroup[] = [];
  private _total = 0;

  ngOnChanges(): void {
    this.categories = [...this.detail.values()];
    this._total = this.categories.reduce((prev, curr) => prev += curr.total , 0);
  }

  id(index: number): number {
    return index;
  }

  getPercentage(category: CategoryGroup): number {
    return Number(((category.total / this._total) * 100).toFixed(2));
  }
}
