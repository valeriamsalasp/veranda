import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {
  notes:any;
  note={
    title:'',
    description:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,  public restProvider: RestProvider) {
    this.note=this.navParams.get('note');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotePage');
  }
  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
  }
}
