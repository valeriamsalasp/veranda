import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    name:string;
    password:string;
    email:string;

    constructor(public navCtrl: NavController) {

    }

    register(){
        console.log("Name:" +this.name);
        console.log("Email:" +this.email);
        console.log("Password:" +this.password);
    }

}