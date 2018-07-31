import { Component } from '@angular/core';

import { ReservePage } from '../reserve/reserve';
import { ReservationsPage } from '../reservations/reservations';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ReservationsPage;
  tab2Root = ReservePage;

  constructor() {

  }
}
