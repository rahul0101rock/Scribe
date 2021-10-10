import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Editor } from 'ngx-editor';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title = ''; 
  editor: Editor = new Editor();
  html = '';
  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  createPost() {
    
  }
}
