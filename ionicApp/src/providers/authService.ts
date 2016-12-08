// import jsonwebtoken from 'jsonwebtoken';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

@Component({
  providers: [Storage]
})
export class AuthService {

  storage:any;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public setUser(token) {
    if(token) {
      console.log('SET STORAGE : ',this.storage);
      this.storage.set('isLogged', true);
      this.storage.set('id_token', token);
    }
  }

  public authenticated(cb) : any {
    console.log('STORAGE : ',this.storage);
    this.storage.get('isLogged').then((data) => {
      console.log('POUET : ', data);
      cb(data);
    });
  }
}
