import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    createSuccess = false;

    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;

    user: any = { username: '', email: '', password: '', first_name: '', last_name: '' };


    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public restProvider: RestProvider) {
    }

    registerUser() {
        if (this.user.username == "" || this.user.email == "" || this.user.password == "" ||
            this.user.first_name == "" || this.user.last_name == "") {
            (this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please fill all the fields',
                buttons: ['OK']
            })).present();
        } else {
            console.log(this.user);
            this.restProvider.addUser(this.user).then((result) => {
                console.log(result);
                this.navCtrl.push(LoginPage)
            }, (err) => {
                let alert = this.alertCtrl.create({
                    title: 'Invalid email',
                    subTitle: 'Please enter a valid email',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
        }
    }
}