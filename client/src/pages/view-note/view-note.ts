import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {
  notes: any;
  note = {
    title: "",
    description: "",
    color:"",
    id: ""
  }
  availableColours:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.note = navParams.get('note');
    this.availableColours = [
      '#b4ecb4',
      '#99dbef',
      '#f7cac9',
      '#a8a8a8',
      '#91A8d0',
      '#FFFFFF'
    ];
  }
  
  ionViewDidLoad() {
    console.log(this.note.id);
  }

  changeColour(colour) {
    this.note.color = colour;
  }

  deleteNote() {
    this.restProvider.deleteNote(this.note.id)
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
    this.navCtrl.pop();
  }

  updateNote() {
    console.log(this.note);
    this.restProvider.updateNote(this.note).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }
}
