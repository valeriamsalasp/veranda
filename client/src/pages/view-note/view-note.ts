import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {
  value:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  public restProvider: RestProvider) {
    this.value= navParams.get('note');
  }

  ionViewDidLoad(){
    console.log(this.value);
  }
}
//   deleteNote(){
//     this.restProvider.deleteNote(this.note.id)
//       // .then(data=>{
//       //   this.notes = data;
//       //   console.log(this.notes);
//   }


//   updateNote(){
//     console.log(this.note);
//     this.restProvider.createNote(this.note).then((result) => {
//         console.log(result);
//     }, (err) => {
//         console.log(err);
//     });
//     this.navCtrl.pop();
//   }
//   goBack(){
//     this.navCtrl.pop()
//   }
// }
