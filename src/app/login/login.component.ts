import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder,public auths: AuthService) {
    this.myForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  }); 
  }

  ngOnInit(): void {
  }
  onSubmit(form: any){
    let email: string = form.value.email;
    let password: string = form.value.password;
    this.auths.login(email,password).then((response: any) => {
      console.log(response);
      this.message="You have been Logged in Successfully";
      this.userError=null;
    }).catch((error: any) =>{
      console.log(error);
      this.message="";
      this.userError=error;
    });
  }

}
