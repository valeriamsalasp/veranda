import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {CreatePage} from '../create/create';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {

  }
  goCreate(){
    this.navCtrl.push(CreatePage)
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

}
