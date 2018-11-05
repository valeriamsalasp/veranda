import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const tokenHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQxNjMxMzAzLCJqdGkiOiI5ZTg0NDcwNDYyMjA0NWVmYWJlZjI5ODVhOTNhMWI3NCIsInVzZXJfaWQiOjEyfQ.PgGHjBnuCms-UEkxWL6CxCbT9AtS_T6Dw0aE40I68zs'
  })
};

@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:8100/';

  constructor(public http: HttpClient, public storageProvider: StorageProvider) {
    console.log('Hello RestProvider Provider');
  }

  token = this.storageProvider.getData('JWT');

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

  deleteNote(id: number) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + 'note/' + id, tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSingularNote(id: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'note/' + id, tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }
}

