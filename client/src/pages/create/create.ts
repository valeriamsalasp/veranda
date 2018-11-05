import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, ViewController, PopoverController, ModalController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { CanvasPage } from '../canvas/canvas';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="popover-page">
      <ion-row class="row-dots">
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('white')" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('tan')" class="dot-tan" [class.selected]="background == 'tan'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('grey')" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('black')" class="dot-black" [class.selected]="background == 'black'"></button>
        </ion-col>
      </ion-row>
    </ion-list>
  `
})

export class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };
  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }
}


@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  title: string;
  notes: any;
  photo: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController,private popoverCtrl: PopoverController, public restProvider: RestProvider, private photoLibrary: PhotoLibrary, private viewCtrl: ViewController, private camera: Camera) {

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

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }
}
