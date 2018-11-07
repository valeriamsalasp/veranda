import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { LoginPage } from '../../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
 const tokenHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQxODU2MDM5LCJqdGkiOiI3OTZiOWQ5NmJkMDU0MzI4YjkyMmMzZDg2MTZlMzkxMyIsInVzZXJfaWQiOjV9.tyaaW7oYeGkS6SIr4ZMLKP5Y5P3U2aLnwkyAUsflPeg'
  })
};


@Injectable()
export class RestProvider {
  token: any;
  apiUrl = 'http://localhost:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, private alertCtrl: AlertController, public nativeStorage: NativeStorage, public storageProvider: StorageProvider, public plt: Platform, private storage: Storage) {
  }

  getToken() {
    this.getFromStorage().then((result) => {
      this.tokenHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + result
        })
      };
      console.log (this.tokenHeader);
    });
  }
  getFromStorage() {
    return this.storage.get('JWT');
  }
  

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/token/', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSingularUser(userId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'user/' + userId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'user/', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getNotes() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'note', tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createNote(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'note/', JSON.stringify(data), tokenHeader)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteNote(id) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + 'note/' + id + '/', tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  updateNote(data) {
    var updateUrl = this.apiUrl + 'note/' + data.id + '/'
    return new Promise(resolve => {
      this.http.put(updateUrl, data, tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  getSingularNote(note) {
    console.log(note);
  }
}

