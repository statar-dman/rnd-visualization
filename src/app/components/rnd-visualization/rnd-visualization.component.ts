import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RNDService } from '../../services/rnd.service';
import { RNDResponse } from '../../models/rnd.model';
import { RndPdfPlotComponent } from './rnd-pdf-plot/rnd-pdf-plot.component';
import { RndCdfPlotComponent } from './rnd-cdf-plot/rnd-cdf-plot.component';
import { RndStatsTableComponent } from './rnd-stats-table/rnd-stats-table.component';

@Component({
  selector: 'app-rnd-visualization',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RndPdfPlotComponent,
    RndCdfPlotComponent,
    RndStatsTableComponent
  ],
  template: `
    <div class="visualization-container">
      <!-- <h1 class="title">RND Visualization</h1> -->
      
      <div class="controls">
        <label for="product">Product:</label>
        <input type="text" id="product" [(ngModel)]="product" (ngModelChange)="updateVisualization()">
        
        <label for="dte">DTE:</label>
        <input type="number" id="dte" [(ngModel)]="dte" (ngModelChange)="updateVisualization()">
        
        <label for="numDays">Number of Days:</label>
        <input type="number" id="numDays" [(ngModel)]="numDays" (ngModelChange)="updateVisualization()">
      </div>

      <div class="plots-container">
        <app-rnd-pdf-plot
          [data]="rndData"
          [product]="product"
          [dte]="dte"
          class="plot-item"
        ></app-rnd-pdf-plot>

        <app-rnd-cdf-plot
          [data]="rndData"
          [product]="product"
          [dte]="dte"
          class="plot-item"
        ></app-rnd-cdf-plot>

        <app-rnd-stats-table
          [data]="rndData"
          class="plot-item"
        ></app-rnd-stats-table>
      </div>
    </div>
  `,
  styles: [`
    .visualization-container {
      padding: 20px;
    }

    .title {
      font-family: 'Open Sans', verdana, arial, sans-serif;
      color: #506784;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    
    .controls {
      margin-bottom: 20px;
      display: flex;
      gap: 20px;
      align-items: center;
    }
    
    .plots-container {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .plot-item {
      width: 100%;
      min-height: 400px;
    }

    label {
      font-weight: 500;
    }
    
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class RNDVisualizationComponent implements OnInit {
  product: string = 'ES';
  dte: number = 180;
  numDays: number = 10;
  rndData!: RNDResponse;

  constructor(private rndService: RNDService) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.rndService.fetchRNDData({
      product: this.product,
      dte: this.dte,
      num_days: this.numDays
    }).subscribe({
      next: (data: RNDResponse) => {
        this.rndData = data;
      },
      error: (error) => {
        console.error('Error fetching RND data:', error);
      }
    });
  }

  updateVisualization() {
    this.fetchData();
  }
}