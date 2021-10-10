import { Component, NgZone, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post: any = {};
  postId: string = "";
  constructor(public activateRoute: ActivatedRoute, public ngZone: NgZone) { 
  let pid = this.activateRoute.snapshot.paramMap.get("postId");
  if(pid) this.postId = pid;

  db.getDoc(db.doc(db.collection(db.getFirestore(),"posts"),this.postId)).then((ds) => {
    this.ngZone.run(() => {
      this.post = ds.data();
      console.log(this.post);
    })

    
  }) }

  ngOnInit(): void {
  }

}
