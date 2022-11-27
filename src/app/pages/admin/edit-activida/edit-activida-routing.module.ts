import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditActividaPage } from './edit-activida.page';

const routes: Routes = [
  {
    path: '',
    component: EditActividaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditActividaPageRoutingModule {}
