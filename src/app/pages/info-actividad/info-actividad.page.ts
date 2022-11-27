import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad, User } from 'src/app/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PageInfoService } from 'src/app/services/page-info.service';

@Component({
  selector: 'app-info-actividad',
  templateUrl: './info-actividad.page.html',
  styleUrls: ['./info-actividad.page.scss'],
})
export class InfoActividadPage implements OnInit {

  newActividad: Actividad = {
    id: this.firestoreService.getID(),
    titulo: '',
    punto: 0,
    actividadI: null,
    actividadF: null,
    descripcion: '',
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
uid= '';
  private path = 'Actividades/';


  constructor(public firestoreService: FirestoreService,
              public edit: PageInfoService,
              public firebaseauthService: FirebaseauthService,
              public router: Router,
              public actividadService: ActividadService,
              public toastController: ToastController,
              ){
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res === null && res === undefined) {
                    console.log('no puedo ver la informacion de la actividad');
                    this.router.navigate(['/login']);
                  }else{
                    this.uid =res.uid;
                    console.log('el id del usuario es =>',this.uid);
                  }
                });
              }

  ngOnInit() {
  const editar = this.edit.getActividad();
    if (editar !== undefined) {
      this.newActividad = editar;
    }
  }

  addActi(){
    const path = 'UserEstudiantes/' + this.uid + '/Echo/';

    this.firestoreService.createDoc(this.edit.getActividad(), path, this.edit.getActividad().id).then( res =>{
      this.router.navigate(['actividad']);
      this.presentToast('Guardado con exito');
      console.log(this.edit.getActividad(), path, this.edit.getActividad().id);
    }).catch(error =>{this.presentToast('NO se pudo guardar');});
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
