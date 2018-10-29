import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import {CreatePage} from '../create/create';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController) {

  }
  goCreate(){
    this.navCtrl.push(CreatePage)
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      /*message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',*/
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}