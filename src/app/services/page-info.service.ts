import { Injectable } from '@angular/core';
import { Actividad } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  editActividad: Actividad;

  constructor() { }

setActividad(acti: Actividad ){
  this.editActividad =acti;
}

getActividad(){
  return this.editActividad;
}

}
