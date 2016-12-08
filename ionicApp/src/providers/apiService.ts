import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

var baseUrl = 'http://localhost:4000/';
var ISBNUrl = '/ISBN/api/v2/json/QUT95LSX/';

@Injectable()
export class ApiService {

  constructor(public http: Http) {
    this.http = http;
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
    let path = baseUrl + url;
    return this.http.get(path)
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
  }

  post(url, data, cb) {
    let path = baseUrl + url;
    console.log('URL : ', path);
    console.log('DATA : ', data);
    return this.http.post(path, data)
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
  }

  put(url, data, cb) {
    let path = baseUrl + url;
    return this.http.put(path, data)
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
  }

  delete(url, data, cb) {
    let path = baseUrl + url;
    let options = new RequestOptions({body: data});
    return this.http.delete(path, options)
      .toPromise()
      .then(function(res) {
        cb(null, res.json());
      }, err => cb(err));
  }

}
