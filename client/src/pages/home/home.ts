import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams } from 'ionic-angular';
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
  notes: any;
  currentColour: string = '#ffffff';
  availableColours: any;
  note = {
    title: "",
    description: "",
    id: 0
  }
  user={};
  userId = 0;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController, public restProvider: RestProvider, public navParams: NavParams) {
    this.initializeItems();
    this.userId= navParams.get('userId');
    this.getSingularUser();
  }

  initializeItems() {
    this.notes;
  }

  getItems(ev: any) {

    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.notes = this.notes.filter((note) => {
        return (note.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(ev) {
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

  getSingularUser() {
    this.restProvider.getSingularUser(this.userId)
      .then(data => {
        this.user = data;
        console.log(this.user);
      });
  }

  goCreate() {
    this.navCtrl.push(CreatePage, {userId:this.userId})
  }


  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

  viewNote() {
    this.navCtrl.push(ViewNotePage);
  }


  getSingularNote(note) {
    this.navCtrl.push(ViewNotePage, {note:note});
    // this.restProvider.getSingularNote(this.note.id)
    //   .then(data => {
    //     this.notes = data;
    //     console.log(this.notes);
    //   });
    // this.navCtrl.push(ViewNotePage);
  }
}

