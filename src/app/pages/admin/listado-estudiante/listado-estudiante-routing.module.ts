import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoEstudiantePage } from './listado-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoEstudiantePageRoutingModule {}
