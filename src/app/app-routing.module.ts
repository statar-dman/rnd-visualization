import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RNDVisualizationComponent } from './components/rnd-visualization/rnd-visualization.component';

const routes: Routes = [
  { path: '', component: RNDVisualizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})