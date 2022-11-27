import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';
import { redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

@Component({
  selector: 'app-nuevo-estudiante',
  templateUrl: './nuevo-estudiante.page.html',
  styleUrls: ['./nuevo-estudiante.page.scss'],
})
export class NuevoEstudiantePage implements OnInit {
  newUser: User = {
    uid: '',
    rol:  'estudiante',
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    ndocumento: '',
    email: '',
    telefono: null,
    programa: '',
    foto: '../../../../assets/perfil-defaul.png',
    puntoAcomulado: null,
    puntoTotal: null,
  };


  newFile = '';


  optionSelect: string;
  tipodocu: string;
  path = 'UserEstudiantes';

  constructor(private firestorageService: FirestorageService,
    private firebaseauthService: FirebaseauthService,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private router: Router,
    private alert: AlertController
  ) {}

  async ngOnInit() {
        const alert = await this.alert.create({
          cssClass: 'alertaGlobal ',
          header: 'IMPORTANTE',
          message: 'Tu contraseña de inico de sesion al princio es tu numero de documento, luego la puedes cambiar .',
          buttons: ['OK']
        });
        await alert.present();
    }


  async imagePefil(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newUser.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async registrarse() {
      const campos={
        nombres: this.newUser.nombres,
        apellidos: this.newUser.apellidos,
        tipoDocumento: this.newUser.tipoDocumento,
        telefono: this.newUser.telefono,
        programa: this.newUser.programa,
      };

      if(campos.nombres === '' && campos.apellidos === '' &&
      campos.tipoDocumento === '' && campos.telefono === null && campos.programa === '' ){
        console.log('campos crv');
        this.presentToast2('Error al registrase, llenar campos vacío.');
    }else{
    const credenciales = {
      email: this.newUser.email,
      password: this.newUser.ndocumento,
    };
    if(credenciales.email === '' && credenciales.password === ''){
      this.presentToast('error al registrase llenar campos');
    }else{

      const res = await this.firebaseauthService.resgirtrar(credenciales.email, credenciales.password);
      console.log(res);
      const uid = await this.firebaseauthService.getUid();
      this.newUser.uid = uid;
        this.guardarUser();
        console.log(uid);
    }
    }
  }

  async guardarUser() {
    const name = this.newUser.uid;
    if (this.imagePefil !== undefined) {
      const res = await this.firestorageService.uploadImage(
        this.newFile, this.path,name);
        this.newUser.foto = res;
      }
      const rest = await this.firestorageService.uploadImage(
        this.newFile,
        this.path,
        name
      );
      this.newUser.foto = rest;
    this.firestoreService
    .createDoc(this.newUser, this.path, this.newUser.uid)
    .then((res) => {
      this.presentToast('Ristrado con exito');
      this.router.navigate(['/home']);
      })
      .catch((error) => {});
    }

  valorprograma(event: CustomEvent) {
    const pro = (this.optionSelect = event.detail.value);
    this.newUser.programa = pro;
  }
  valordocumento(event: CustomEvent) {
    const tido = (this.tipodocu = event.detail.value);
    this.newUser.tipoDocumento = tido;
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
    telefono: null,
    programa: '',
    foto: '',
    puntoAcomulado: null,
    puntoTotal: null
  };
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'success',
    });
    toast.present();
  }

  async presentToast2(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color:'danger',
    });
    toast.present();
  }
}
