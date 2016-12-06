import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/authService';
import {tokenNotExpired} from 'angular2-jwt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
  providers: [AuthService, Storage]
})
export class Library {

  local: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public storage: Storage) {
    this.authService = authService;
    this.local = storage;
  }

  ionViewDidLoad() {
    console.log('Hello LibraryPage Page');
  }

  ionViewCanEnter(): boolean {
    //return this.authService.authenticated();
    console.log('LA PUTAIN DE SA MERE : ', this.local.get('id_token'));
    console.log('TOKEN EXPIRED : ', tokenNotExpired());

    return tokenNotExpired();
    //return true;
  }

}
