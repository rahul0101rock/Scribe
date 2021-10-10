import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import * as db from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { where, orderBy } from 'firebase/firestore';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment: string = "";
  comments: any[] = [];
  logged: boolean = false;
  @Input("postId") postId: any;
  constructor() { 
    onAuthStateChanged(auth.getAuth(),(user) => {
      if(user) {
        this.logged = true;
      } else {
        this.logged= false;
      }
    })
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment(){

    if(this.comment.length < 5){
      return;
    }
    db.addDoc(db.collection(db.getFirestore(),"comments"),{
      text: this.comment,
      post: this.postId,
      owner: auth.getAuth().currentUser?.uid,
      ownerName: auth.getAuth().currentUser?.displayName,
      created: serverTimestamp()
    }).then((data: any) => {
      console.log(data)
      this.getComments();
    }).catch((error: any) => {
      console.log(error);
    })

  }

  getComments(){

    this.comments = [];
    db.getDocs(db.query(db.collection(db.getFirestore(),"comments"), orderBy("created", "desc"), 
    where("post", "==", this.postId))).then((data) => {
      data.docs.forEach((cr)=>{
        this.comments.push(cr.data())
      })
    }).catch((err) => {
      console.log(err);
    })

  }

}
