import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { StorageProvider } from '../../providers/storage/storage';
import { JwtHelper } from 'angular2-jwt';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    user = {username: '', password:''};
    arr = [];
    userId = 0;
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController, private viewCtrl: ViewController, public restProvider: RestProvider, public storageProvider: StorageProvider) {
    }

    login() {
        console.log(this.user);
        this.restProvider.login(this.user).then((result) => {
            for (let key in result){
                if(result.hasOwnProperty(key)){
                    this.arr.push(result[key]);
                }
            }
            // console.log(this.arr[1]);
            var decoded = this.jwtHelper.decodeToken(this.arr[1]);
            this.userId = decoded.user_id;
            this.storageProvider.storeData(this.arr[1])
            this.navCtrl.push(HomePage,{userId:this.userId})
        }, (err) => {
            console.log(err);
        });
    }

    goRegister() {
        this.navCtrl.push(RegisterPage)
    }
}