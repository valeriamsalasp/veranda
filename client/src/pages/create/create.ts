import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
title:string;

note = {title:"", description:""};

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,  public restProvider: RestProvider) {
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose note color');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
  }

  createNote() {
    console.log(this.note);
    this.restProvider.addNote(this.note).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(err);
    });
  }
}

