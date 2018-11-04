import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { StorageProvider } from '../../providers/storage/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    username:string;
    password:string;

    user = {username: '', password:''};

    arr = [];
    
    constructor(public navCtrl: NavController, private viewCtrl: ViewController, public restProvider: RestProvider, public storageProvider: StorageProvider) {
        
    }

    login(){
        console.log(this.user);
        this.restProvider.login(this.user).then((result) => {
            for (let key in result){
                if(result.hasOwnProperty(key)){
                    this.arr.push(result[key]);
                }
            }
            console.log(this.arr[1]);
            this.storageProvider.storeData(this.arr[1])
            this.navCtrl.push(HomePage)
        }, (err) => {
            console.log(err);
        });
    }
    

    goRegister(){
        this.navCtrl.push(RegisterPage)
    }
}