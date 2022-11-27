import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PageInfoService } from 'src/app/services/page-info.service';
import { Actividad, User } from '../../../models';

@Component({
  selector: 'app-edit-activida',
  templateUrl: './edit-activida.page.html',
  styleUrls: ['./edit-activida.page.scss'],
})
export class EditActividaPage implements OnInit {

  newActividad: Actividad ={
    id: this.firestoreService.getID(),
    titulo:'',
    punto:0,
    actividadI:null,
    actividadF:null,
    descripcion:'',
    periodo: '',
    estado:'enviado'
  };

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


  private path = 'Actividades/';

  uid = '';

  constructor(public firestoreService: FirestoreService,
              public edit: PageInfoService,
              public toastController: ToastController,
              public firebaseauthService: FirebaseauthService,
              public router: Router) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null) {
                    this.uid = res.uid;
                  }else{
                    this.router.navigate(['/login']);
                  }
              });
            }


  ngOnInit() {
    const editar = this.edit.getActividad();
    if (editar !== undefined) {
      this.newActividad = editar;
      console.log('info se puede ver para editar');

    }
  }

  actualizarActividad() {
    this.firestoreService.createDoc(this.newActividad, this.path, this.newActividad.id).then( res =>{
          this.presentToast('Guardado con exito');
          this.router.navigate(['/ver-actividad']);
        }).catch(error =>{
          this.presentToast('NO se pudo guardar');
        });
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color:'secondary',
    });
    toast.present();
  }

}


