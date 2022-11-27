import { PageInfoService } from '../../../services/page-info.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Actividad, User } from '../../../models';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-actividad',
  templateUrl: './ver-actividad.page.html',
  styleUrls: ['./ver-actividad.page.scss'],
})
export class VerActividadPage implements OnInit {

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

actividades: Actividad[]=[];
textoBuscar= '';

uid='';
  private path = 'Actividades/';

  constructor(public firestoreService: FirestoreService,
              public edi: PageInfoService,
              public alertController: AlertController,
              public toastController: ToastController,
              public firebaseauthService: FirebaseauthService,
              public router: Router) {

               /*  this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res === null || res === undefined) {
                    console.log('no puedo pasar');
                    this.router.navigate(['/login']);
                  }else{
                    this.uid =res.uid;
                    console.log(this.uid);
                  }
                }); */
              }



  ngOnInit() {
    this.getActividades();
  }

  getActividades(){
    this.firestoreService.getCollection<Actividad>(this.path).subscribe( res=>{
      this.actividades= res;
    });
  }
  async deleteActividad(acti: Actividad){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'ALERTA',
        message: 'Seguro quieres eliminar la actividad <strong> '+acti.titulo+' </strong>.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Confirmar',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path, acti.id).then( res =>{
                this.presentToast('Eliminado con exito');
                this.alertController.dismiss();
              }).catch(error =>{
                this.presentToast('NO se pudo eliminar');
              });
            }
          }
        ]
      });
      await alert.present();
  }

  editActividad(acti: Actividad){
    this.edi.setActividad(acti);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'secondary',
    });
    toast.present();
  }

  buscar( event ){
    this.textoBuscar = event.detail.value;
  }

}
