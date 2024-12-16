// src/app/components/rnd-visualization/rnd-pdf-plot/rnd-pdf-plot.component.ts

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RNDResponse } from '../../../models/rnd.model';

declare const Plotly: any;

@Component({
  selector: 'app-rnd-pdf-plot',
  standalone: true,
  imports: [CommonModule],
  template: `<div [id]="elementId" class="pdf-plot"></div>`,
  styles: [`
    .pdf-plot {
      width: 100%;
      height: 400px;
    }
  `]
})
export class RndPdfPlotComponent implements OnChanges, OnDestroy {
  @Input() data!: RNDResponse;
  @Input() product!: string;
  @Input() dte!: number;
  
  protected elementId = 'pdfPlot';

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
    const traces = this.data.data.map((point, index) => ([
      {
        x: point.move_grid,
        y: point.pdf_values,
        name: point.date,
        type: 'scatter',
        line: { color: this.getColor(index) }
      },
      {
        x: [point.mode],
        y: [point.pdf_values[point.move_grid.indexOf(point.mode)]],
        mode: 'markers',
        marker: { color: 'black', size: 8 },
        showlegend: false
      }
    ])).flat();

    const layout = {
      title: `Risk-Neutral Distribution PDF: ${this.product}${this.dte}`,
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
      yaxis: { title: 'Probability Density' },
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