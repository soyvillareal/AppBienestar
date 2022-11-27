import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

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

  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router,
              public popoverController: PopoverController ) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null) {
                    this.uid =res.uid;
                    this.getInfo(this.uid);
                  }
                });
              }




  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
  }

  getInfo(uid: string){
    this.firestoreService.getDoc<User>(this.path, uid).subscribe(res =>{
      this.newUser =res;
    });
  }

}
