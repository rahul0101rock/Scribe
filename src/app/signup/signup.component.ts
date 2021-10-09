import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import { getAuth, updateProfile } from 'firebase/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    let email: string = form.value.email;
    let password: string = form.value.password;
    let firstName: string = form.value.firstName;
    let lastName: string = form.value.lastName;
    let fullName: string = firstName + " " + lastName;
    let au = getAuth();
    auth.createUserWithEmailAndPassword(au,email,password).then((response) => {
      console.log(response);
      updateProfile(response.user, {displayName: fullName,
         photoURL: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}).then(()=>{
           this.message="You have been Signed Up Successfully"
         });
    }).catch((error) =>{
      console.log(error);
      this.userError=error;
    });
  }
}
