import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditActividaPageRoutingModule } from './edit-activida-routing.module';

import { EditActividaPage } from './edit-activida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditActividaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditActividaPage]
})
export class EditActividaPageModule {}
