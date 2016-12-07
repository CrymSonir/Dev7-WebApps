import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ApiService } from '../providers/apiService';
import { AuthService } from '../providers/authService';
import { MyApp } from './app.component';
import { Accueil } from '../pages/accueil/accueil';
import { Login } from '../pages/login/login';
import { ScanBook } from '../pages/scanBook/scanBook';
import { Library } from '../pages/library/library';

@NgModule({
  declarations: [
    MyApp,
    Accueil,
    Login,
    ScanBook,
    Library
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Accueil,
    Login,
    ScanBook,
    Library
  ],
  providers: [{provide: [ErrorHandler, ApiService, AuthService], useClass: IonicErrorHandler}]
})
export class AppModule {}
