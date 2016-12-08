import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ApiService } from '../../providers/apiService';
import { AuthService } from '../../providers/authService';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Library } from '../library/library';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService, Storage, AuthService]
})
export class Login {

  login = {
    username: null,
    password: null
  }

  storage:any;
  authService:any;

  constructor(public navCtrl: NavController, public api: ApiService, storage: Storage, authService: AuthService) {
    this.navCtrl = navCtrl;
    this.api = api;
    this.storage = storage;
    this.authService = authService;
  }

  loginForm() {
    let self = this;
    console.log('LOGGED',this.login);
    this.api.post('login', {username: this.login.username, password: this.login.password},
    function(err, result) {
      if(err) {
        console.log(err);
      }
      let response = result.json ? result.json() : result;
      if(response.msg && response.msg === 'LOGGED') {
        self.authSuccess(response.token);
        self.navCtrl.setRoot(Library);
      };
    });
  }

  authSuccess(token) {
    this.authService.setUser(token);
  }

}
