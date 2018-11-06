import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { LoginPage } from '../../pages/login/login';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const tokenHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQxNzMxODI0LCJqdGkiOiJjN2QwMDc1ZmM5MGE0NTg5YmNlOTRlNTJiYWNjOWVmNiIsInVzZXJfaWQiOjJ9.0mVpcrijhhDCt1B77vIs9ydqLFOoE6uu8ddE9VpRrDA'
  })
};

@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:8100/';

  constructor(public http: HttpClient, public storageProvider: StorageProvider) {

  }

  //token = this.storageProvider.getData('JWT');

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

