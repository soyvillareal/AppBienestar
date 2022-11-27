import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {

  newUser: User = {
    uid: '',
    rol:  '',
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    ndocumento: '',
    email: '',
    telefono: 0,
    programa: '',
    foto: '../../../../assets/perfil-defaul.png',
    puntoAcomulado: 0,
    puntoTotal: 0,
  };

  path = 'UserEstudiantes';
  uid='';

  admin = false;
  estudiante= false;

  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router ) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null) {
                    this.uid =res.uid;
                    this.getInfo(this.uid);
                  }
                });
              }


  salir(){
    this.firebaseauthService.logout();
    this.router.navigate(['/login']);
  }

  getInfo(uid: string){
    this.firestoreService.getDoc<User>(this.path, uid).subscribe(res =>{
      this.newUser =res;
      console.log('el rol es '+res.rol);
      if(res !== null){
        if(res.rol === 'admin'){
          this.admin = true;
          this.estudiante = false;
        }if (res.rol ==='estudiante') {
          this.admin = false;
          this.estudiante = true;
        }
      }else{
        this.admin = false;
        this.router.navigate(['/login']);
      }
    });
  }


}
