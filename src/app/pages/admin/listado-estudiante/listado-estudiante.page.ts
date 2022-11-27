import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';
import { InfoUSerService } from '../../../services/info-user.service';

@Component({
  selector: 'app-listado-estudiante',
  templateUrl: './listado-estudiante.page.html',
  styleUrls: ['./listado-estudiante.page.scss'],
})
export class ListadoEstudiantePage implements OnInit {

  user: User[]=[];
  textoBuscar= '';
  uid='';
  path = 'UserEstudiantes/';

  constructor(public firestoreService: FirestoreService,
              public firebaseauthService: FirebaseauthService,
              public router: Router,
              public fire: FirestoreService,
              public info: InfoUSerService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.firestoreService.getCollection<User>(this.path).subscribe( res=>{
      this.user= res;
    });
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
  getEstudiante(user: User){
    this.info.setUser(user);
    /* this.router.navigate(['/puntos-estudiante']); */
  }

}
