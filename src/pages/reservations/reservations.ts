import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

import { logout } from '../../services/logout';
import {onAuthStateChanged} from '../../services/onAuthStateChanged';
import {LoginPage} from '../login/login';
import {ReservePage} from '../reserve/reserve';
import {getAll, cancelReserve} from '../../services/reserve';

@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html'
})

export class ReservationsPage{

  reservations = null;
  keysReservations = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.navCtrl = navCtrl;
  }

  presentConfirm(idReserve) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Cancel Reserve',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Yes', 
          handler: () =>{
            cancelReserve(idReserve);
            getAll()
            .then((reservations)=>{
              this.reservations = reservations;
              if(reservations)
                this.keysReservations = Object.keys(reservations);
            });
          }
        }
      ]
    });
    alert.present();
  }

  onHandleLogout(){
    logout()
      .then((message) => {
        this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top',
        }).present();
        this.navCtrl.push(LoginPage);
      });
  }

  onHandleEditReserve(idReserve){
    this.navCtrl.push(ReservePage, {
      id: idReserve
    });    
  }

  ionViewWillEnter(){
    onAuthStateChanged()
    .then((user) => { 
      getAll()
      .then((reservations)=>{
        this.reservations = reservations;
        if(reservations)
          this.keysReservations = Object.keys(reservations);
      });
    })
    .catch(()=>{
      this.navCtrl.push(LoginPage)
      
    })
  }
}
