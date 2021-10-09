import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder,public auths: AuthService) {
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
    this.auths.signup(email,password,firstName,lastName).then((response: any) => {
      console.log(response);
      this.message="You have been Signed Up Successfully";
      this.userError=null;
    }).catch((error: any) =>{
      console.log(error);
      this.message="";
      this.userError=error;
    });
  }
}
