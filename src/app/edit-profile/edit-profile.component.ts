import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  message: string = "";
  constructor() {this.getProfile();}

  ngOnInit(): void {
  }
  getProfile(){
    let userId = auth.getAuth().currentUser?.uid;
    db.getDoc(db.doc(db.collection(db.getFirestore(),"users"),userId))
    .then((documentSnapshot) => {

      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      console.log(this.user);

    }).catch((error) => {
      console.log(error);
    })

  }

  update(){

    this.message = "Updating Profile...";
    const au = auth.getAuth().currentUser;
    if(au){
    auth.updateProfile(au,{
      displayName: this.user.displayName, photoURL: this.user.photoUrl
    }).then(() => {
      let userId = auth.getAuth().currentUser?.uid;
      db.updateDoc(db.doc(db.collection(db.getFirestore(),"users"),userId),{
        first_name: this.user.displayName.split(' ')[0],
        last_name: this.user.displayName.split(' ')[1],
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio
      }).then(() => {
       this.message = "Profile Updated Successfully.";
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })

  }
}
}
