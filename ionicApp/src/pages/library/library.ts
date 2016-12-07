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
    this.api.getISBN('book/9780849303159', function(err, result) {
      if(err) {
        console.log('PADBOL : ', err);
      }
      console.log('BOOK : ', result);
    });
  }

  ionViewCanEnter(): boolean {
    // return authService.authenticated();

    return true;
  }

}
