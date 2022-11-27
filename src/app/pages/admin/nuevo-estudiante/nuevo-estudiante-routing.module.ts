import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEstudiantePage } from './nuevo-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEstudiantePageRoutingModule {}
