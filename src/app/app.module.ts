import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ReservationsPage } from '../pages/reservations/reservations';
import { ReservePage } from '../pages/reserve/reserve';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyC_Hb4yDjy5A40er2fbuK8kH65myHb0fDw",
  authDomain: "restaurantecactus-a4597.firebaseapp.com",
  databaseURL: "https://restaurantecactus-a4597.firebaseio.com",
  storageBucket: "restaurantecactus-a4597.appspot.com",  
});

@NgModule({
  declarations: [
    MyApp,
    ReservePage,
    RegisterPage,
    LoginPage,
    ReservationsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReservePage,
    RegisterPage,
    LoginPage,
    ReservationsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
