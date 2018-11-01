import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:8100/';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'user', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  getNotes() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'note').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  createNote(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'note/', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

