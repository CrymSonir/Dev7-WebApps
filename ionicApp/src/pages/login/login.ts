import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/apiService';
import {AuthService} from '../../providers/authService';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Library } from '../library/library';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService, JwtHelper, AuthService]
})
export class Login {

  login = {
    username: null,
    password: null
  }

  user: any;
  local: any;

  constructor(public navCtrl: NavController, public api: ApiService, public jwtHelper: JwtHelper, public auth: AuthService) {
    this.navCtrl = navCtrl;
    this.api = api;
    this.jwtHelper = new JwtHelper();
    console.log('INIT : ', this.jwtHelper);
  }

  loginForm() {
    let self = this;
    this.api.post('login', {username: this.login.username, password: this.login.password},
    function(err, result) {
      if(err) {
        console.log('LOGIN ERROR : ', err);
      }
      let response = result.json ? result.json() : result;
      if(response.msg && response.msg === 'LOGGED') {
        self.authSuccess(response.token);
        self.navCtrl.setRoot(Library);
      };
    });
  }

  authSuccess(token) {
    var username = this.jwtHelper.decodeToken(token).username;
    var user = {
      username: username,
      token: token
    };
    this.auth.setUser(user);
  }

}
