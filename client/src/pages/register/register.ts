import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators } from '@angular/forms'
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    createSuccess = false;

    username:string;
    email: string;
    password :string;
    first_name:string;
    last_name:string;

    user = {username: '', email: '', password:'', first_name: '', last_name:'' };
    

    constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    }
    
    registerUser() {
        console.log(this.user);
        this.restProvider.addUser(this.user).then((result) => {
            console.log(result);
            this.navCtrl.push(LoginPage)
        }, (err) => {
            console.log(err);
        });
    }
}