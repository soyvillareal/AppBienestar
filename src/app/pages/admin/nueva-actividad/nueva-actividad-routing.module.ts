import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaActividadPage } from './nueva-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaActividadPageRoutingModule {}
