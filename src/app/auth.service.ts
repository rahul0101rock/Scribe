import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import { getAuth, updateProfile } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(email: string, password: string){
    let au = getAuth();
    return auth.signInWithEmailAndPassword(au,email, password);
  }

  signup(email: string, password: string, first_name: string, last_name: string){
    return new Promise((resolve, reject) => {
      let au = getAuth();
      auth.createUserWithEmailAndPassword(au,email, password).then((response) => {

        updateProfile(response.user, {
          displayName: first_name + " " + last_name,
          photoURL: "https://api.adorable.io/avatars/" + Math.floor(Math.random() * 1000)
          }).then(() => {
          resolve(response.user);
        }).catch((error) => {
          reject(error);
        })

      }).catch((error) => {
        reject(error);
      })

    })
  }


}
