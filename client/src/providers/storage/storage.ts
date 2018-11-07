import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageProvider {

    constructor(private nativeStorage: NativeStorage) {
        console.log('Hello RestProvider Provider');
    }

    storeData(data) {
        this.nativeStorage.setItem('JWT', data)
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem("JWT")
            .then(
                res =>{
                    return(res);
                }, (err) =>{
                    reject(err);
                });
        });
    }
}
//     getToken(token){
//         for (let key in token){
//             if(token.hasOwnProperty(key)){
//                 var arr = [];
//                 arr.push(token[key]);
//                 return arr;
//             }
//         }
//     }
// }