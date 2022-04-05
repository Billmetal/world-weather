import { Component } from '@angular/core';

import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';

@Component({
  selector: 'jv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  act: boolean = true;
  act2: boolean = false;

  constructor() {
    moment.locale('pt-br');
  }

  activateClass(a: boolean){
    if(a === this.act){
      this.act = true;
      this.act2 = false;
    } else {
      this.act = false;
      this.act2 = true;
    }
  }
}
