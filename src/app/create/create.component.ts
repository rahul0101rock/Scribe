import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import * as db from'firebase/firestore';
import * as auth from 'firebase/auth';
import { Editor } from 'ngx-editor';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { Toolbar } from 'ngx-editor';
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
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];;
  @Output('postCreated') postCreated = new EventEmitter();
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
      this.postCreated.emit();
    })
    .catch((error: any) => {
      console.log(error);
    });
}
}
