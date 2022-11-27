import { Injectable } from '@angular/core';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class InfoUSerService {

  user: User ;

  constructor() { }

setUser(use: User ){
  return this.user = use;
}

getActividad(){
  return this.user;
}
}
