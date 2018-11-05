import { Component } from '@angular/core';
import { NavController, AlertController, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public restProvider: RestProvider, private photoLibrary: PhotoLibrary, private viewCtrl: ViewController, private camera: Camera) {

  }

  note = { title: "", description: "", user_id: 2 };
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose note color');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });
    alert.present();
  }

  createNote() {
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
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64' + imageData;
      console.log('photo');
    }, (error) => {
      //handle error
      console.log(error);
    });
  }

  addPhoto() {
    console.log('camera');
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64' + imageData;
      console.log('photo');
    }, (error) => {
      //handle error
      console.log(error);
    });
  }

  canvas(){
    this.navCtrl.push(CanvasPage)
  }
}
