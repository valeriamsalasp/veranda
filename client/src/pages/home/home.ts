import { Component, ViewChild, Pipe } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams, Searchbar } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';
import { ViewNotePage } from '../view-note/view-note';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  @ViewChild('mySearchbar') searchbar: Searchbar;

  notes: any;
  availableColours: any;
  note = {
    title: "",
    description: "",
    color: ""
  }
  user = {};
  userId = 0;
  items: any;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController, public restProvider: RestProvider, public navParams: NavParams, public storageProvider: StorageProvider, public storage: Storage) {
    this.userId = navParams.get('userId');
    this.getSingularUser();
    this.availableColours = [
      '#b4ecb4',
      '#99dbef',
      '#f7cac9',
      '#a8a8a8',
      '#91a8d0',
      '#ffffff'
    ];

  }

  setItems() {
    this.items = this.notes;
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.notes = this.notes.filter(function (note) {
        return note.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  ionViewDidLoad() {
    this.restProvider.setTokenHeader();
  
  }

  onCancel(ev) {
    this.searchbar.value = '';
  }

  ionViewDidEnter() {
    this.getNotes();
  }

  getNotes() {
    this.restProvider.getNotes()
      .then(data => {
        this.notes = data;
        console.log(this.items);
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
    this.navCtrl.push(CreatePage, { userId: this.userId })
  }

  changeColour(colour) {
    this.note.color = colour;
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
            this.restProvider.deleteFromStorage().then((result) => {
              this.navCtrl.pop();
            });
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
    this.navCtrl.push(ViewNotePage, { note: note });
  }
}

