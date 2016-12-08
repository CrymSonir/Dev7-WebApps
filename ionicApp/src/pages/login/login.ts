import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
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

  storage    :any;
  authService:any;
  nav        :any;

  constructor( public api: ApiService, nav:Nav, storage: Storage, authService: AuthService) {
    this.api = api;
    this.storage = storage;
    this.authService = authService;
    this.nav = nav;
  }

  loginForm() {
    let self = this;
    this.api.post('login', {username: this.login.username, password: this.login.password},
    function(err, result) {
      if(err) {
        console.log(err);
      }
      let response = result.json ? result.json() : result;
      if(response.msg && response.msg === 'LOGGED') {
        self.authSuccess(response.token);
        alert('vous avez été log');
        location.reload();
      };
    });
  }

  authSuccess(token) {
    this.authService.setUser(token);
  }

}
