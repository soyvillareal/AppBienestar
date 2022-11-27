import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerActividadPageRoutingModule } from './ver-actividad-routing.module';

import { VerActividadPage } from './ver-actividad.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerActividadPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [VerActividadPage]
})
export class VerActividadPageModule {}
