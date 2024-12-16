// src/app/app.component.ts

import { Component } from '@angular/core';
import { RNDVisualizationComponent } from './components/rnd-visualization/rnd-visualization.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RNDVisualizationComponent],
  template: `
    <main>
      <h1>RND Visualization</h1>
      <app-rnd-visualization></app-rnd-visualization>
    </main>
  `,
  styles: [`
    main {
      padding: 20px;
    }
    h1 {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {}