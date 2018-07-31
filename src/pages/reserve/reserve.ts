import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {getById, newReserve, edit} from '../../services/reserve';

@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html'
})
export class ReservePage {

  reserve = {
    name: '',
    email: '',
    phone: '',
    diners: '',
    date: '',
    time: '',
  }

  idReserve: null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.idReserve = null;
    this.idReserve = navParams.get('id');
    if(this.idReserve){
      getById(this.idReserve)
      .then((reserve) => {
        this.reserve = reserve;
      });
    }
  }

  onClickReserve(){
    newReserve(this.reserve)
    .then((result) => {
      this.navCtrl.parent.select(0);
      this.reserve = {
        name: '',
        email: '',
        phone: '',
        diners: '',
        date: '',
        time: '',
      }
    })
    .catch((error) => {
    });
  }

  onEditReserve(){
    edit(this.reserve, this.idReserve)
    .then(result => {
      this.navCtrl.parent.select(0);      
    })
    .catch((error) => {
    });
  }

}
