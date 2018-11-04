import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';
import { ViewNotePage } from '../view-note/view-note';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchText: string;
  notes: any[];
  note = {
    title: '',
    description: '',
    id: 0
  }
  public isSearchbarOpened = false;
  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController, public restProvider: RestProvider) {
    this.initializeItems();
  }

  initializeItems() {
    this.notes;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.notes = this.notes.filter((note) => {
        return (note.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel() {
    this.initializeItems();
  }

  ionViewDidEnter() {
    this.getNotes()
  }

  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
  }

  goCreate() {
    this.navCtrl.push(CreatePage);
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
  viewNote() {
    this.navCtrl.push(ViewNotePage);
  }

  // deleteNote(){
  //   this.restProvider.deleteNote()
  //    .then(data=>{
  //       this.notes = data;
  //       console.log(this.notes);
  //    });
  // }

  getSingularNote() {
    this.restProvider.getSingularNote(this.note.id)
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      });
    this.navCtrl.push(ViewNotePage);
  }
}

