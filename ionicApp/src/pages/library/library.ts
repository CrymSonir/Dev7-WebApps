import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/authService';
import { ApiService } from '../../providers/apiService';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
  providers: [ApiService, AuthService]
})
export class Library {

  local: any;

  constructor(public navCtrl: NavController, public api: ApiService) {
  }

  ionViewDidLoad() {
    console.log('Hello LibraryPage Page');
    this.api.get('users/5848198c675e8a3361fbbed7', function(err, result) {
      if(err) {
        console.log('PADBOL : ', err);
      }
      console.log('USER : ', result);
    });
  }

  ionViewCanEnter(): boolean {
    // return authService.authenticated();

    return true;
  }

}
