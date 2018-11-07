import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { StorageProvider } from '../../providers/storage/storage';
import { JwtHelper } from 'angular2-jwt';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    user = { username: '', password: '' };
    arr = [];
    userId = 0;
    token: any;
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController,private alertCtrl: AlertController, public restProvider: RestProvider, public storageProvider: StorageProvider, public nativeStorage: NativeStorage, private storage: Storage) {
    }

    login() {
        
        this.restProvider.login(this.user).then((result) => {
            for (let key in result) {
                if (result.hasOwnProperty(key)) {
                    this.arr.push(result[key]);
                }
            }

            var decoded = this.jwtHelper.decodeToken(this.arr[1]);
            this.userId = decoded.user_id;
            console.log(this.arr[1]);
            this.storage.set('JWT', this.arr[1]);

            this.navCtrl.push(HomePage, { userId: this.userId });
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Invalid Credentials',
                subTitle: 'Combination user/password incorrect',
                buttons: ['Dismiss']
              });
              alert.present();
        });
    }

    goRegister() {
        this.navCtrl.push(RegisterPage)
    }
}