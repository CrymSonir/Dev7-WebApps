import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

var baseUrl = 'http://localhost:4000/';
var ISBNUrl = '/ISBN/api/v2/json/QUT95LSX/';

@Injectable()
export class ApiService {

  constructor(public http: Http, public storage: Storage) {
    var self = this;
    this.http = http;
    this.storage = storage;
  }

  getISBN(url, cb) {
    let path = ISBNUrl + url;
    console.log('ISBN : ', path);
    return this.http.get(path)
      .toPromise()
      .then(function(res) {
        cb(null, res.json().data);
      }, err => cb(err));
  }

  get(url, cb) {
    var self = this;
    let path = baseUrl + url;
    var headers = new Headers();
    this.storage.get('id_token').then(function(val) {
      headers.append('x-access-token', val);
      self.http.get(path, {headers: headers})
        .toPromise()
        .then(function(res) {
        console.log('RESPONSE : ', res);
          cb(null, res.json());
        }, err => cb(err));
    });
  }

  post(url, data, cb) {
    var self = this;
    let path = baseUrl + url;
    var headers = new Headers();
    this.storage.get('id_token').then(function(val) {
      headers.append('x-access-token', val);
      self.http.post(path, data, {headers: headers})
        .toPromise()
        .then(function(res) {
          cb(null, res.json());
        }, err => cb(err));
      });
  }

  put(url, data, cb) {
    var self = this;
    let path = baseUrl + url;
    var headers = new Headers();
    this.storage.get('id_token').then(function(val) {
      headers.append('x-access-token', val);
      self.http.put(path, data, {headers: headers})
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
    });
  }

  delete(url, data, cb) {
    var self = this;
    let path = baseUrl + url;
    var headers = new Headers();
    this.storage.get('id_token').then(function(val) {
    headers.append('x-access-token', val);
    let options = new RequestOptions({body: data, headers: headers});
    self.http.delete(path, options)
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
    });
  }

}
