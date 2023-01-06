import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRes: any;
  role: any
  password: any
  users = [
    {
      user: "doctor",
      password: "doctor"
    },
    {
      user: "admin",
      password: "admin"
    },
    {
      user: 'patiebt',
      password: 'patient'
    }
  ]
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }

  login() {
    console.log("login");

    this.role = this.loginForm.controls.email.value
    this.password = this.loginForm.controls.password.value
    // console.log(this.username);


    for (let i = 0; i < this.users.length; i++) {
      if (this.role == 'admin' && this.password == 'admin') {
        this.router.navigateByUrl('root');
        localStorage.setItem('role', this.role);

        // this.router.navigate(['/main']);
      }
      else if (this.role == 'doctor' && this.password == 'doctor') {
        this.router.navigateByUrl('root');
        localStorage.setItem('role', this.role);
      }
      else if (this.role == 'patient' && this.password == 'patient') {
        this.router.navigateByUrl('root');
        localStorage.setItem('role', this.role);
      }
      else {

      }
    }
  }
}
