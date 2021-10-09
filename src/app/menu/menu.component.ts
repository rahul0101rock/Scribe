import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  logged: boolean = false;
  user:any;
  constructor() { 
    if(this.user) {
      this.logged = true;
    } else {
      this.logged = false;
  }
  let au = auth.getAuth();
  auth.onAuthStateChanged(au,(user) => {
    this.user = user;
    if(user){
      this.logged = true;
    } else {
      this.logged= false;
    }
  })
  }

  ngOnInit(): void {
  }
  logout(){
    let au = auth.getAuth();
    auth.signOut(au);
  }
}
