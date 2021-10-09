import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  user: any;
  constructor() {
    this.user= auth.getAuth().currentUser;
    console.log(this.user);
   }

  ngOnInit(): void {
  }

}
