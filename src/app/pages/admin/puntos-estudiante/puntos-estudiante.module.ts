import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosEstudiantePageRoutingModule } from './puntos-estudiante-routing.module';

import { PuntosEstudiantePage } from './puntos-estudiante.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosEstudiantePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PuntosEstudiantePage]
})
export class PuntosEstudiantePageModule {}
