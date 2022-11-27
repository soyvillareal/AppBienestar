import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerActividadPage } from './ver-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: VerActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerActividadPageRoutingModule {}
