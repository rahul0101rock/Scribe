import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: any;
  @Output('onDelete') onDelete = new EventEmitter();

  postData: any = {};
  user: any = {};
  constructor() { }

  ngOnInit(): void {
    this.postData = this.post.data();
    console.log(this.postData)
    this.user = auth.getAuth().currentUser;
  }

  delete(){
    db.deleteDoc(db.doc(db.collection(db.getFirestore(),"posts"),this.post.id)).then(() => {
      this.onDelete.emit();
    });

  }

}
