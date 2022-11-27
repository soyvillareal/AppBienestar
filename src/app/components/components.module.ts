import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ],
  exports:[
    HeaderComponent,
    MenuComponent,
    ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
