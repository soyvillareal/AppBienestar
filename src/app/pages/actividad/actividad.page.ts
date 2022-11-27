import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Actividad, User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PageInfoService } from 'src/app/services/page-info.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

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
              public router: Router,
              ) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res === null && res === undefined) {
                    console.log('no puedo ver las actividad');
                    this.router.navigate(['/login']);
                  }else{
                    this.uid =res.uid;
                    console.log('el id del usuario es =>',this.uid);
                  }
                });
              }



  ngOnInit() {
    this.getActividades();
  }

  getActividades(){
    this.firestoreService.getCollection<Actividad>(this.path).subscribe( res=>{
      this.actividades= res;
    });
  }

  verActividad(acti: Actividad){
    this.edi.setActividad(acti);
  }

  buscar( event ){
    this.textoBuscar = event.detail.value;
  }

}
