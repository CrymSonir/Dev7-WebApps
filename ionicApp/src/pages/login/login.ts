import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Library } from '../library/library';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController, public http: Http) {
    this.navCtrl = navCtrl;
    this.http = http;
  }

  login = {}

  loginForm() {
    console.log('LOGIN FORM');
    var self = this;
    return this.http.post('http://localhost:4000/login', {username: "bob", password: "mdp"})
                    .toPromise()
                    .then(function(res) {
                      console.log('RESPONSE : ', res.json());
                      if(res.json().msg && res.json().msg === 'LOGGED') {
                        self.navCtrl.setRoot(Library);
                      };
                    }, err => console.log('ERROR QUERY : ', err));


  }

}
