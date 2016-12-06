import { Component } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';
import { Platform, NavController } from 'ionic-angular';

@Component({
  selector: 'page-scanBook',
  templateUrl: 'scanBook.html'
})
export class ScanBook {

	bookISBN: any;

	constructor(public navCtrl: NavController, public platform: Platform ) {

	}

	scan() {
		this.platform.ready().then(() => {
            BarcodeScanner.scan().then((barcodeData) => {
            	this.bookISBN = barcodeData.text;
			}, (err) => {
			    // An error occurred
			});
        });
	}
	manualCode() {
		this.platform.ready().then(() => {
            
        });
	}

}
