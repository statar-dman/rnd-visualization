// src/app/components/rnd-visualization/rnd-stats-table/rnd-stats-table.component.ts

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RNDResponse } from '../../../models/rnd.model';

declare const Plotly: any;

interface StatsRow {
  Date: string;
  Mode: string;
  [key: string]: string;
}

@Component({
  selector: 'app-rnd-stats-table',
  standalone: true,
  imports: [CommonModule],
  template: `<div [id]="elementId" class="stats-table"></div>`,
  styles: [`
    .stats-table {
      width: 100%;
      height: 500px;
      margin-top: 20px;
    }
  `]
})
export class RndStatsTableComponent implements OnChanges, OnDestroy {
  @Input() data!: RNDResponse;
  
  protected elementId = 'statsTable';

  ngOnChanges(changes: SimpleChanges) {
    if (this.data) {
      setTimeout(() => {
        this.createTable();
      });
    }
  }

  ngOnDestroy() {
    Plotly.purge(this.elementId);
  }

  private createTable() {
    const statsData: StatsRow[] = this.data.data.map(point => ({
      Date: point.date,
      Mode: `${point.mode.toFixed(2)}%`,
      ...Object.fromEntries(
        Object.entries(point.cdf_values).map(([move, val]) => 
          [`${move}%`, val.toFixed(4)]
        )
      )
    }));

    const trace = {
      type: 'table',
      header: {
        values: Object.keys(statsData[0]),
        align: 'center',
        fill: { color: '#F8F9FA' },
        font: { 
          size: 14,
          family: "'Open Sans', verdana, arial, sans-serif",
          color: '#506784'
        },
        line: { color: '#DFE2E6', width: 1 },
        height: 40
      },
      cells: {
        values: Object.keys(statsData[0]).map(key => 
          statsData.map(row => row[key])),
        align: 'center',
        fill: { color: ['white'] },
        font: { 
          size: 13,
          family: "'Open Sans', verdana, arial, sans-serif",
          color: '#506784'
        },
        line: { color: '#DFE2E6', width: 1 },
        height: 35
      }
    };

    const layout = {
      title: {
        text: 'Distribution Statistics',
        font: {
          family: "'Open Sans', verdana, arial, sans-serif",
          size: 18,
          color: '#506784'
        },
        y: 0.95,
        yanchor: 'top'
      },
      height: 500,
      width: null,
      margin: { t: 80, r: 20, l: 20, b: 20 }
    };

    const config = { 
      responsive: true,
      displayModeBar: false
    };

    Plotly.newPlot(this.elementId, [trace], layout, config);
  }
}