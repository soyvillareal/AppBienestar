import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

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


  newFile = '';


  optionSelect: string;
  tipodocu: string;
  path = 'UserEstudiantes';
  uid='';

  constructor(
    public firestorageService: FirestorageService,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public router: Router,
    public toastController: ToastController
  ) {
    this.firebaseauthService.stateAuth().subscribe(res =>{
      if (res !== null) {
        this.uid =res.uid;
        this.getInfo(this.uid);
      }else{
        this.router.navigate(['/login']);
      }


    });
  }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
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
  }

  async registrarse() {
    this.firestoreService
    .createDoc(this.newUser, this.path, this.newUser.uid)
    .then((res) => {
      this.presentToast(' Actualizado  con exito');
      this.router.navigate(['/editar-perfil']);
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

  getInfo(uid: string){
    this.firestoreService.getDoc<User>(this.path, uid).subscribe(res =>{
      this.newUser =res;
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'secondary',
    });
    toast.present();
  }

}
