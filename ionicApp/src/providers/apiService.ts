import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

var baseUrl = 'http://localhost:4000/';

@Injectable()
export class ApiService {

  constructor(public http: Http) {
    this.http = http;
  }

  get(url, cb) {
  console.log('GET');
    let path = baseUrl + url;
    return this.http.get(path)
      .toPromise()
      .then(function(res) {
        console.log('RESPONSE GET: ', res.json());
        cb(null, res.json());
      }, err => cb(err));
  }

  post(url, data, cb) {
    console.log('POST');
    let path = baseUrl + url;
    return this.http.post(path, data)
      .toPromise()
      .then(function(res) {
        console.log('RESPONSE POST: ', res.json());
        cb(null, res.json());
      }, err => cb(err));
  }

  put(url, data, cb) {
    console.log('PUT');
    let path = baseUrl + url;
    return this.http.put(path, data)
      .toPromise()
      .then(function(res) {
        console.log('RESPONSE PUT: ', res.json());
        cb(null, res.json());
      }, err => cb(err));
  }

  delete(url, data, cb) {
    console.log('PUT');
    let path = baseUrl + url;
    let options = new RequestOptions({body: data});
    return this.http.delete(path, options)
      .toPromise()
      .then(function(res) {
        console.log('RESPONSE DELETE: ', res.json());
        cb(null, res.json());
      }, err => cb(err));
  }

}
