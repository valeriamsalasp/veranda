import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewNotePage } from '../../pages/view-note/view-note'
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'note',
  templateUrl: 'note.html'
})
export class NoteComponent {

  user = {};
  userId = 0;
  availableColours: any;
  note = {
    title: "",
    description: "",
    color: ""
  }
  notes: any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.userId = navParams.get('userId');
    this.availableColours = [
      '#b4ecb4',
      '#99dbef',
      '#f7cac9',
      '#a8a8a8',
      '#91a8d0',
      '#ffffff'
    ];
  }

  ionViewDidEnter() {
    this.getNotes();
  }

  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
  }
  getSingularNote(note) {
    this.navCtrl.push(ViewNotePage, { note: note });
    // this.restProvider.getSingularNote(this.note.id)
    //   .then(data => {
    //     this.notes = data;
    //     console.log(this.notes);
    //   });
    // this.navCtrl.push(ViewNotePage);
  }
  changeColour(colour) {
    this.note.color = colour;
  }
}
