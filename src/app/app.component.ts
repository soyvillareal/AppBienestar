import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from './services/firebaseauth.service';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  uid = '';
  constructor(
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public router: Router
  ) {
    this.firebaseauthService.stateAuth().subscribe((res) => {
      if (res !== null) {
        this.uid = res.uid;
        console.log('pase');
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
