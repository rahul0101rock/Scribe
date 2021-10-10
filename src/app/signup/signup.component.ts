import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder,public auths: AuthService,public router: Router) {
    this.myForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]]
    },{
      validator: this.matchpass("password", "confirmPassword")
    }
    );
   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    let email: string = form.value.email;
    let password: string = form.value.password;
    let firstName: string = form.value.firstName;
    let lastName: string = form.value.lastName;
    this.auths.signup(email,password,firstName,lastName).then((user: any) => {

      db.setDoc(db.doc(db.collection(db.getFirestore(),"users"),user.uid),
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        photoURL: user.photoURL,
        interests: "",
        bio: "",
        hobbies: ""
      }).then(() => {
        this.message = "You have been signed up successfully.";
        this.userError = null;
        this.router.navigate(['/myblogs'])
      })
    }).catch((error: any) =>{
      console.log(error);
      this.message="";
      this.userError=error;
    });
  }

  matchpass(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if(password.value == confirmPassword.value){
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        })
      }

    }
  }
}
