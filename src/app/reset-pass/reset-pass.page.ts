/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  // eslint-disable-next-line id-blacklist
  email='';
  constructor(private firebaseauthService: FirebaseauthService ) { }

  ngOnInit() {
  }

  resertLink(){

    if (this.email != '') {
      this.firebaseauthService.resetPassword(this.email).then(()=>{
        console.log('enviado');
      }).catch(()=>{
        console.log('error');
      });
    } else {
      alert('error');
    }

  }

}
