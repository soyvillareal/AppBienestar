import { ComponentsModule } from '../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEstudiantePageRoutingModule } from './nuevo-estudiante-routing.module';

import { NuevoEstudiantePage } from './nuevo-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoEstudiantePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevoEstudiantePage]
})
export class NuevoEstudiantePageModule {}
