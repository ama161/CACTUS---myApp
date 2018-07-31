import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import {login} from '../../services/login';
import {onAuthStateChanged} from '../../services/onAuthStateChanged'
import {RegisterPage} from '../register/register';
import {ReservationsPage} from '../reservations/reservations';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage{

  email = '';
  password = '';
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.navCtrl = navCtrl;

  }

  onHandleLogin(){
    login(this.email, this.password)
      .then((user) => {
        this.navCtrl.push(ReservationsPage);
      })
      .catch(error => {
        this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'top',
        }).present();
      });
  }

  onHandleRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
