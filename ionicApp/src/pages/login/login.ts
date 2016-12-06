import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/apiService';
import {AuthService} from '../../services/auth/auth';
import {JwtHelper} from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import {FORM_DIRECTIVES} from 'angular2/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Library } from '../library/library';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService, JwtHelper, Storage]
})
export class Login {

  login = {
    username: null,
    password: null
  }

  user: any;
  local: any;

  constructor(public navCtrl: NavController, public api: ApiService, public jwtHelper: JwtHelper, public storage: Storage) {
    this.navCtrl = navCtrl;
    this.api = api;
    this.jwtHelper = new JwtHelper();
    this.local = storage;
    console.log('INIT : ', this.jwtHelper);
  }

  loginForm() {
    console.log('LOGIN FORM : ', this.login);
    let self = this;
    this.api.post('login', {username: this.login.username, password: this.login.password},
    function(err, result) {
      if(err) {
        console.log('LOGIN ERROR : ', err);
      }
      console.log('RESULT END : ', result);
      let response = result.json ? result.json() : result;
      if(response.msg && response.msg === 'LOGGED') {
        self.authSuccess(response.token);
        self.navCtrl.setRoot(Library);
      };
    });
  }

  authSuccess(token) {
    this.local.set('id_token', token);
    console.log('TOKEN : ', token);
    console.log('TOKEN DATA : ', this.jwtHelper.decodeToken(token));
    this.user = this.jwtHelper.decodeToken(token).username;
  }

}
