import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/authService';
import { ApiService } from '../../providers/apiService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
  providers: [ApiService, AuthService, Storage]
})
export class Library {

  storage: any;
  api: any;

  constructor(public navCtrl: NavController, public authService: AuthService, storage: Storage,  api: ApiService) {
    this.authService = authService;
    this.storage = storage;
    this.api = ApiService;
  }

  ionViewDidLoad() {
    // this.api.getISBN('book/9780849303159', function(err, result) {
    //   if(err) {
    //     console.log('PADBOL : ', err);
    //   }
    //   console.log('BOOK : ', result);
    // });
  }

  ionViewCanEnter(): boolean {
    //return this.authService.authenticated();
    this.storage.get('id_token').then((val) => {
       console.log('id_token', val);
     })

    return true;
  }

}
