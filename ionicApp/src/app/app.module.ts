import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Accueil } from '../pages/accueil/accueil';
import { Login } from '../pages/login/login';
import { ScanBook } from '../pages/scanBook/scanBook';

@NgModule({
  declarations: [
    MyApp,
    Accueil,
    Login,
    ScanBook
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Accueil,
    Login,
    ScanBook
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
