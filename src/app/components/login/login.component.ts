import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRes: any;
  role: any
  password: any
  display: boolean;
  displayForgotDialog: boolean;
  name: any
  visible: boolean = true
  changetype: boolean = true
  constructor(private router: Router, private fb: FormBuilder,private service:DataService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }
  viewPass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }
  login() {
    console.log("login");
    const body = {
      "username": this.loginForm.controls.email.value,
      "password": this.loginForm.controls.password.value
    }
    let status = ''
    this.service.loginVerification(body).subscribe((data: any) => {
      console.log(data);
      status = data.status
      if (data.status == 'success') {
        sessionStorage.setItem('userId', JSON.stringify(data.response[0].Id))
        console.log(data.response);
        console.log(data.response[0].Role);
        if (data.response[0].Role == 'patient') {
          var patientId = data.response[0].Id          
          this.router.navigateByUrl('root/listofdoctors');
          this.role = "Patient"
          sessionStorage.setItem('role', this.role);
        }
        else if (data.response[0].Role == 'doctor') {
          this.router.navigateByUrl('root/doctor');
          this.role = "Doctor"
          sessionStorage.setItem('role', this.role);
        }
      }
    })
    if (status = "!success") {
      // console.log("failure");
      this.messageService.add({ severity: 'error', summary: 'Enter UserName and Password correctly', detail: '' });
    }
  }
}
