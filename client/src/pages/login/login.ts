import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    email:string;
    password:string;

    constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
        
    }

    login(){
        console.log("Email:" +this.email);
        console.log("Password:" +this.password);
        this.navCtrl.push(HomePage);
    }

    goRegister(){
        this.navCtrl.push(RegisterPage)
    }
}