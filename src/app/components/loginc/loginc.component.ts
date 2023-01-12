import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from 'src/app/data.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-loginc',
  templateUrl: './loginc.component.html',
  styleUrls: ['./loginc.component.scss'],
  providers: [MessageService]
})
export class LogincComponent implements OnInit {
  display: boolean;
  displayForgotDialog: boolean;
  loginForm: FormGroup;
  loginRes: any;
  role: any
  password: any
  name: any
  visible: boolean = true
  changetype: boolean = true
  constructor(private router: Router, private fb: FormBuilder, private service: DataService, private messageService: MessageService, public activatedRoute: ActivatedRoute) { }

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
    console.log(body.username);
    if (body.username == 'admin' && body.password == 'admin') {
      status = 'success'
      this.router.navigateByUrl('root/admin');
      this.role = "Admin"
      sessionStorage.setItem('role', this.role);
    }
    if (status = "!success") {
      // console.log("failure");
      this.messageService.add({ severity: 'error', summary: 'Enter UserName and Password correctly', detail: '' });
    }

    // const data1 = {
    //   userId: this.loginForm.controls.email.value,
    //   password: this.loginForm.controls.password.value,
    //   // customerOrVenFlag: this.loginForm.controls.loginRole.value.id
    // };
    // console.log(data1);
    // this.router.navigateByUrl('root');

    //   this.apisService.postApi(environment.logInData,data1).subscribe(res => {
    //     this.loginRes = res;
    //     console.log("log",res,this.loginRes.success )
    //     // this.primaryrole=res.data.primaryRole,
    //     // sessionStorage.setItem('primaryrole', this.primaryrole);

    //     if (this.loginRes.success === true) {

    //       sessionStorage.setItem('loginData', JSON.stringify(this.loginRes));

    //       sessionStorage.setItem('loginId', 'true');
    //       this.router.navigateByUrl('root');  
    //     } else if(this.loginRes.success === false){
    //       console.log("llllllll",this.loginRes.success)

    //     } else {
    //       // tslint:disable-next-line: max-line-length
    //       // this.messageService.add({ severity: 'error', detail: this.loginRes.message === (null || undefined)  ? 'Please Enter Valid Email Id' : this.loginRes.message,  });
    //       // this.loader = false;
    //     }
    //   });
    // // }
  }
  registration() {
    this.display = true;
  }
  // navigateToCustomerRegisterForm() {
  //   this.router.navigate(['/customerRegistrationPage']);
  // }
  // navigateToconsultantRegisterForm() {
  //   this.router.navigate(['/consultantRegistrationPage']);
  // }
  // navigateToVendorPage()
  // {
  //   this.router.navigate(['/vendorRegistrationPage'],);
  // }
  // forgotPassword() {
  //   this.displayForgotDialog = true;
  //   this.forgotpwdForm.get('emailId').reset();
  // }
  showDialog() {
    this.display = true;
  }

}
