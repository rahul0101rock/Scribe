import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  posts: any[] = [];
  constructor(public activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe((rp: any) => {
      this.getProfile(rp.id);
      this.getUsersPosts(rp.id);
    });

  }

  ngOnInit(): void {
  }
  getProfile(id: string){
    db.getDoc(db.doc(db.collection(db.getFirestore(),"users"),id))
    .then((ds) => {
      this.user = ds.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = ds.id;
      this.user.hobbies = this.user.hobbies.split(",");
    }).catch((error) => {
      console.log(error);
    })
  }

  getUsersPosts(id: string){
    db.getDocs(db.query(db.collection(db.getFirestore(),"posts"), db.where("owner","==", id)))
    .then((data)=>{
      this.posts = data.docs;
    })
  }

}
