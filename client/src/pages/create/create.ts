import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, NavParams, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ModalController } from 'ionic-angular';
import { CanvasPage } from '../canvas/canvas';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {
  title: string;
  notes: any;
  photolibrary: any;
  userId: number;
  currentColour: string = '#ffffff';
  availableColours: any;
  isRecording = false;
  match: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public modalCtrl: ModalController,
    public restProvider: RestProvider, private photoLibrary: PhotoLibrary, private viewCtrl: ViewController, private camera: Camera,
    private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
    this.userId = navParams.get('userId');
    this.availableColours = [
      '#b4ecb4',
      '#99dbef',
      '#f7cac9',
      '#a8a8a8',
      '#91A8d0',
      '#FFFFFF'
    ];

  }

  note: any = { title: "", description: "", user_id: 0 };


  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }


  startListening() {
    let options = {
      language: 'es-VE'
    }
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      this.note.description = this.note.description + " " + matches[0];
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  changeColour(colour) {
    this.note.color = colour;
  }


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
      this.note.image = 'data:image/jpeg;base64,' + imageData;
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
      this.note.image = 'data:image/jpeg;base64,' + imageData;
      console.log('photo from library');
      console.log(this.note.image);
    }, (error) => {
      console.log(error);
    });
  }

  canvas() {
    this.navCtrl.push(CanvasPage)
  }
}