import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';
import { ViewNotePage } from '../view-note/view-note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: any;
  
  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController, public restProvider: RestProvider) {
    // for (let note = 0; note < 5; note++) {
    //   this.notes.push( this.notes.length );
    // }
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let note = 0; note < 5; note++) {
  //       this.notes.push( this.notes.length );
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, this.notes.length);
  // }
  ionViewDidEnter(){this.getNotes()}

  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
  }

  goCreate() {
    this.navCtrl.push(CreatePage)
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(LoginPage);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  viewNote(){
    this.navCtrl.push(ViewNotePage);
  }
}