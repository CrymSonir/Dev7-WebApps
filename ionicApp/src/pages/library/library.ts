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
  jwt: any;

  booksRead: any;
  booksReading: any;
  booksNotRead: any;

  constructor(public navCtrl: NavController, public authService: AuthService, storage: Storage,  api: ApiService) {
    this.authService = authService;
    this.storage = storage;
    this.api = api;
    this.jwt = 'Should be angular2-jwt but it does not work';
  }

  ionViewDidLoad() {
    var self = this;
    this.storage.get('id_token').then(function(val) {
      self.api.get('books/' + 'Here, should decode the token with angular2-jwt to get the user id but it does not work', function(err, result) {
        if(err) {
          console.log('ERR : ', err);
        }
        self.booksRead = result.read;
        self.booksReading = result.reading;
        self.booksNotRead = result.notRead;
      });
    });

  }

  ionViewCanEnter(): boolean {
    return true;
  }

}
