import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CreatePage } from '../../pages/create/create';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {
  notes:any;
  note={
    title:'',
    description:'',
    id: 0
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,  public restProvider: RestProvider) {
    this.note=this.navParams.get('note');
  }

  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
  }

  deleteNote(){
    this.restProvider.deleteNote(this.note.id)
      .then(data=>{
        this.notes = data;
        console.log(this.notes);

      });
  }

  getSingularNote() {
    this.restProvider.getSingularNote(this.note.id)
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
      this.navCtrl.push(ViewNotePage);
  }
}
