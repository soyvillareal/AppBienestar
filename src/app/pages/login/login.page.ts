import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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


uid='';
  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public alert: AlertController,
              public router: Router) {


                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res == null) {
                    console.log('no puedo pasar');
                    this.router.navigate(['/login']);
                  }else{
                    this.uid =res.uid;
                    console.log('listo');
                    console.log(res.uid);
                  }

                });


              }

ngOnInit() {
  }

  async ingresar(){
    const credenciales = {
      email: this.newUser.email,
      password: this.newUser.ndocumento,
    };
    this.firebaseauthService.login(credenciales.email, credenciales.password).then(res =>{
      this.router.navigate(['/home']);
      console.log('ingreso con exito');
      this.initUser();
    }).catch(err => {this.presentAlert();});
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Los datos son incorectos ó no existe el usuario.',
      buttons: ['OK']
    });

    await alert.present();
  }

  initUser(){
    this.newUser ={
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
  }

}
