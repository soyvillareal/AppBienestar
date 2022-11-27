import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoActividadPageRoutingModule } from './info-actividad-routing.module';

import { InfoActividadPage } from './info-actividad.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoActividadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InfoActividadPage]
})
export class InfoActividadPageModule {}
