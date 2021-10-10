import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import * as db from'firebase/firestore';
import * as auth from 'firebase/auth';
import { Editor } from 'ngx-editor';
import { addDoc, serverTimestamp } from 'firebase/firestore';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title = '';
  content = '';
  editor: Editor = new Editor();
  html = '';
  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  createPost() {
    console.log(this.title,this.content);
    const fr = db.getFirestore();
    addDoc(db.collection(fr,"posts"),{
      title: this.title,
      content: this.content,
      owner: auth.getAuth().currentUser?.uid,
      created: serverTimestamp()
    }).then((data: any) => {
      console.log(data);
    })
    .catch((error: any) => {
      console.log(error);
    });
}
}
