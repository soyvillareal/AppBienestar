import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoEstudiantePageRoutingModule } from './listado-estudiante-routing.module';

import { ListadoEstudiantePage } from './listado-estudiante.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoEstudiantePageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ListadoEstudiantePage]
})
export class ListadoEstudiantePageModule {}
