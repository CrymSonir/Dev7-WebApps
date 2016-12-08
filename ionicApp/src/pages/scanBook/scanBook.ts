import { Component } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';
import { Platform, NavController } from 'ionic-angular';
import { ApiService } from '../../providers/apiService';

@Component({
  selector: 'page-scanBook',
  templateUrl: 'scanBook.html',
  providers: [ApiService]
})
export class ScanBook {

	bookISBN: any;
	api: any;

	constructor(public navCtrl: NavController, public platform: Platform, api:ApiService) {
		this.api = api;
	}

	scan() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.
            BarcodeScanner.scan().then((barcodeData) => {
            	this.bookISBN = barcodeData.text;
            	this.api.getISBN('book/9781598534979',function(err, result){
    				alert(result[0].title);
    			});
			}, (err) => {
			    // An error occurred
			});
        });
	}
	manualCode() {
		this.platform.ready().then(() => {
        	// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.    
        });
	}

}
