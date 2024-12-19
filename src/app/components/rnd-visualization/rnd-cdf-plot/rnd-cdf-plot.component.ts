import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RNDResponse } from '../../../models/rnd.model';

declare const Plotly: any;

@Component({
  selector: 'app-rnd-cdf-plot',
  standalone: true,
  imports: [CommonModule],
  template: `<div [id]="elementId" class="cdf-plot"></div>`,
  styles: [`
    .cdf-plot {
      width: 100%;
      height: 400px;
    }
  `]
})
export class RndCdfPlotComponent implements OnChanges, OnDestroy {
  @Input() data!: RNDResponse;
  @Input() product!: string;
  @Input() dte!: number;
  
  protected elementId = 'cdfPlot';

  ngOnChanges(changes: SimpleChanges) {
    if (this.data) {
      setTimeout(() => {
        this.createPlot();
      });
    }
  }

  ngOnDestroy() {
    Plotly.purge(this.elementId);
  }

  private createPlot() {
    const traces = this.data.data.map((point, index) => ({
      x: point.move_grid,
      y: point.cdf_curve,
      name: point.date,
      type: 'scatter',
      line: { color: this.getColor(index) }
    }));

    const layout = {
      title: `Risk-Neutral Distribution CDF: ${this.product}${this.dte}`,
      height: 400,
      width: null,
      showlegend: true,
      legend: {
        x: 0.02,
        y: 0.98,
        xanchor: 'left',
        yanchor: 'top',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        bordercolor: 'lightgrey',
        borderwidth: 1
      },
      yaxis: { 
        title: 'Cumulative Probability',
        gridcolor: 'lightgrey',
        showgrid: true
      },
      margin: { t: 50, r: 20, l: 70, b: 40 }
    };

    const config = { 
      responsive: true,
      displayModeBar: true
    };

    Plotly.newPlot(this.elementId, traces, layout, config);
  }

  private getColor(index: number): string {
    const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'];
    return colors[index % colors.length];
  }
}