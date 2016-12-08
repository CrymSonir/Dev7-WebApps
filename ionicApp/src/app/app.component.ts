import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../providers/authService';
import { Accueil } from '../pages/accueil/accueil';
import { Login } from '../pages/login/login';
import { ScanBook } from '../pages/scanBook/scanBook';
import { Library } from '../pages/library/library';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
  providers: [AuthService, Storage]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Accueil;
  
  storage: any;
  authService:any;
  isAuth: false;

  pages: Array<{title: string, component: any}>;
  login: { title: string, component: any };

  constructor(public platform: Platform, authService: AuthService, storage: Storage) {
    this.initializeApp();
    this.storage = storage;
    this.authService = authService;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: Accueil },
      { title: 'Library', component: Library },
      { title: 'Scan livre', component: ScanBook },
      { title: 'Login', component: Login }

    ];
    this.login = { title: 'Login', component: Login };
    let self = this;
    this.authService.authenticated(function(val) {
      self.isAuth = val;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let self = this;
    this.authService.authenticated(function(val) {
      self.isAuth = val;
      self.nav.setRoot(page.component);
    });
  }

  logout() {
    console.log('LOGOUT');
    this.storage.remove('id_token');
    this.storage.remove('isLogged');
    this.isAuth = false;
  }

}
