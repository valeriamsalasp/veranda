import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

    constructor(private nativeStorage: NativeStorage, private storage: Storage) {
        console.log('Hello RestProvider Provider');
    }


  
  }