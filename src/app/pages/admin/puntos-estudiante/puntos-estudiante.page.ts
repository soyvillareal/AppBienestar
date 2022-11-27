import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../../services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Actividad, EstadoActividad, User } from 'src/app/models';
import { InfoUSerService } from '../../../services/info-user.service';
import { PageInfoService } from '../../../services/page-info.service';

@Component({
  selector: 'app-puntos-estudiante',
  templateUrl: './puntos-estudiante.page.html',
  styleUrls: ['./puntos-estudiante.page.scss'],
})
export class PuntosEstudiantePage implements OnInit {

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
  estado: string;
  totalPuntos: number;
  estadoact: EstadoActividad[] =['enviado','listo'];


  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public info: InfoUSerService,
              public page :PageInfoService) {
                const ss = this.info.getActividad();
                if (ss !== undefined) {
                  this.newUser = ss;
                  console.log(':) info del Estudiante => ',this.newUser.uid);
                } }

  ngOnInit() {
    this.getActividades();
  }

  async getActividades(){
    const id = await this.info.getActividad().uid;
      console.log('el id del usruario es => ',id);
      const path = 'UserEstudiantes/'+id+'/Echo';
      this.firestoreService.getCollection<Actividad>(path).subscribe( re=>{
        this.actividades= re;
        console.log(this.actividades);
        this.totalPuntos=0;
        re.forEach(pun=>{
          const es = this.estado = pun.estado;
          if(es === 'listo' ){
            this.totalPuntos = (pun.punto) + this.totalPuntos ;
          }
        });
      });
}



async cabiarEstado(acti: Actividad, estado: EstadoActividad){
  console.log('estado =>',estado);

  const id = await this.info.getActividad().uid;
  const path = 'UserEstudiantes/'+id+'/Echo';
  const udi = acti.id;
  const updatEstado = {
    estado
  };
  this.firestoreService.updateDoc(updatEstado, path, udi).then(()=>{
    console.log('estado :)');
  });
}


}
