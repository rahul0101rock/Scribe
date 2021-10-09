import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  message: string="";
  userError:any;
  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  }); 
  }

  ngOnInit(): void {
  }

}
