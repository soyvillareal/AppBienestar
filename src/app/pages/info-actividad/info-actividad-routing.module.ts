import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoActividadPage } from './info-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: InfoActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoActividadPageRoutingModule {}
