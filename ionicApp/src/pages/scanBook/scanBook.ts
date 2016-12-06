import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scanBook',
  templateUrl: 'scanBook.html'
})
export class ScanBook {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ScanBookPage Page');
  }

}
