import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { register } from '../../services/register'
import { LoginPage } from '../login/login';
import { ReservationsPage } from '../reservations/reservations';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  email = '';
  password = '';
  agree = false;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  onHandleRegister(){
    if(this.agree){
      register(this.email, this.password)
      .then((code) => {
        console.log(' go to ReservationsPage');
        this.navCtrl.push(ReservationsPage);        
        this.toastCtrl.create({
          message: "Thank you for registering",
          duration: 3000,
          position: 'top',
        }).present();
      })
      .catch(error => {
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'top',
        }).present();
      })
    }
  }

  onHandleLogin(){
    this.navCtrl.push(LoginPage);
  }
}
