import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ModalController } from 'ionic-angular';
import { CanvasPage } from '../canvas/canvas';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  title: string;
  notes: any;
  photo: any;
  photolibrary: any;
  userId: number;
  currentColour: string = '#ffffff';
  availableColours: any;
  drawing:any = {
    id: null,
    src: null
  }


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public modalCtrl: ModalController, public restProvider: RestProvider, private photoLibrary: PhotoLibrary, private viewCtrl: ViewController, private camera: Camera) {
    this.userId= navParams.get('userId');
    this.availableColours = [
      '#b4ecb4',
      '#99dbef',
      '#f7cac9',
      '#a8a8a8',
      '#91A8d0',
      '#FFFFFF'
    ];
  }

  changeColour(colour) {
    this.currentColour = colour;
  }

  note = { title: "", description: "", user_id:0};


  createNote() {
    this.note.user_id = this.userId;
    console.log(this.note);
    this.restProvider.createNote(this.note).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }

  takePhoto() {
    console.log('camera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
      console.log('photo');
    }, (error) => {
      console.log(error);
    });
  }

  addPhoto() {
    console.log('camera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photolibrary = 'data:image/jpeg;base64,' + imageData;
      console.log('photo from library');
    }, (error) => {
      console.log(error);
    });
  }

  canvas(){
    this.navCtrl.push(CanvasPage)
  }
}