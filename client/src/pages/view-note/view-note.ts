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
    title:"",
    description:"",
    id: 0
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,  public restProvider: RestProvider) {
    this.note=this.navParams.get('note');
  }


  deleteNote(){
    this.restProvider.deleteNote(this.note.id)
      .then(data=>{
        this.notes = data;
        console.log(this.notes);

      });
  }


  updateNote(){
    console.log(this.note);
    this.restProvider.createNote(this.note).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(err);
    });
    this.navCtrl.pop();
  }
  goBack(){
    this.navCtrl.pop()
  }
}
