import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntosEstudiantePage } from './puntos-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: PuntosEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntosEstudiantePageRoutingModule {}
