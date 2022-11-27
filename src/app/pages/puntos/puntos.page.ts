import { Component, OnInit } from '@angular/core';
import { Actividad, Listo, User } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { ActividadService } from '../../services/actividad.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {


  listo: Listo;
  uid='';
  user: User;
  data =[];
  totalPunto: number;
  periodo: any;
  periodo2: any;
  vperiodo: string[] = [];

  textoBuscar= '';

  actividades: Actividad[]=[];

  constructor(private firestoreService: FirestoreService,
              private firebaseauthService: FirebaseauthService,
              public router: Router,
              private actividadService: ActividadService,
              ) {
                this.estatu();
                this.getActividades();
              }

  ngOnInit() {
  }

estatu(){
  this.firebaseauthService.stateAuth().subscribe(res =>{
    if (res === null || res === undefined) {
      console.log('no puedo pasar');
      this.router.navigate(['/login']);
    }else{
      this.uid =res.uid;
      console.log('ok');
    }
  });
}


async getActividades(){
  this.uid = await this.firebaseauthService.getUid();
    console.log('el id del usruario es => ',this.uid);
    const path = 'UserEstudiantes/'+ this.uid+'/Echo';
    this.firestoreService.getCollection<Actividad>(path).subscribe( re=>{
      this.actividades= re;
      re.forEach(peri=>{
        console.log(peri.periodo);
        this.vperiodo.push(peri.periodo);
      });
      this.periodo=this.vperiodo;
      this.periodo = new Set(this.periodo);
    });
}

async buscar( event ){
  const tx = this.textoBuscar = event.detail.value;
  this.uid = await this.firebaseauthService.getUid();
  const path = 'UserEstudiantes/'+ this.uid+'/Echo';
  this.firestoreService.getCollection<Actividad>(path).subscribe( re=>{
    this.actividades= re;

    this.totalPunto= 0;
    re.forEach(peri=>{
      console.log(peri.periodo);
      this.periodo2 = peri.periodo;
      const ffr = this.periodo2 = peri.periodo;
      const punto = peri.punto;
      if(tx === ffr){
        if(peri.estado === 'listo'){

          this.totalPunto = (peri.punto) + this.totalPunto ;
        }
      }
    });
  });
}

}

