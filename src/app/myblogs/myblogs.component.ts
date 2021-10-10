import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';
import { limit, orderBy } from 'firebase/firestore';
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  user: any;
  posts: any[] = [];
  constructor() {
    this.user= auth.getAuth().currentUser;
    console.log(this.user);
    this.getPosts();
   }

  ngOnInit(): void {
  }
  getPosts(){
    // get the list of posts
    db.getDocs(db.query(db.collection(db.getFirestore(),"posts"), orderBy("created", "desc"), limit(100))).then((qs: any) => {
      console.log(qs.docs);
      this.posts = qs.docs;

    }).catch((err) => {
      console.log(err);
    })

  }

  onPostCreated(){
    // refresh the list of posts
    this.posts = [];
    this.getPosts();

  }

  onDelete(){
    // refresh the list of posts
    this.posts = [];
    this.getPosts();
  }

}
