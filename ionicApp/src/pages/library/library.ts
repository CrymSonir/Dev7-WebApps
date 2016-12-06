import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello LibraryPage Page');
  }

}
