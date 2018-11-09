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

@Injectable()
export class RestProvider {
  token: any;
  apiUrl = 'http://192.168.1.7:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, private alertCtrl: AlertController, public nativeStorage: NativeStorage, public storageProvider: StorageProvider, public plt: Platform, private storage: Storage) {
  }

  setTokenHeader() {
    return this.getFromStorage().then((result) => {
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

  deleteFromStorage() {
    return this.storage.clear();
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
      this.http.get(this.apiUrl + 'note', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createNote(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'note/', JSON.stringify(data), this.tokenHeader)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteNote(id) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + 'note/' + id + '/', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  updateNote(data) {
    var updateUrl = this.apiUrl + 'note/' + data.id + '/'
    return new Promise(resolve => {
      this.http.put(updateUrl, data, this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}

