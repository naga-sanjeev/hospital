import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  gender: any;
  profile: any
  userId: any
  userData: any
  constructor(private fb: FormBuilder, private router: Router, private service: DataService) { }

  ngOnInit(): void {

    this.userId = sessionStorage.getItem('userId' || '[]')
    
    this.getUserData();
    this.gender = [
      { gen: 'male' },
      { gen: 'female' }
    ]
    this.profile = this.fb.group({
      firstName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      middleName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      lastName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("([0-9]{10,15}$)"),]],
      alternativeNumber: ['',],
      age: ['', [Validators.pattern("^[0-9]{2}$"), Validators.required]],
      userName: ['', [Validators.pattern("^[a-zA-Z]*"), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      gender: ['', [Validators.required]],
      addressLine1: ['', [Validators.maxLength(60)]],
      addressLine2: ['', [Validators.maxLength(60)]],
      city: ['', [Validators.maxLength(30)]],
      state: ['', [Validators.maxLength(30)]],
      country: ['', [Validators.maxLength(20)]],
      pinCode: ['', [Validators.pattern("^[0-9]*")]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }
  getUserData() {
    console.log(this.userId);
    this.service.getUserById(this.userId).subscribe((res: any) => {
      console.log(res);
      this.userData = res.respones[0]
      console.log(this.userData);
      this.profile.patchValue({
        firstName: res.respones[0].Firstname,
        middleName: res.respones[0].Middlename,
        lastName: res.respones[0].LastName,
        email: res.respones[0].Email,
        phoneNumber: res.respones[0].PhoneNumber,
        alternativeNumber: res.respones[0].AlternativeNumber,
        age: res.respones[0].Age,
        gender: res.respones[0].Gender,
        userName: res.respones[0].username,
        password: res.respones[0].password,
        addressLine1: res.respones[0].Addressline1,
        addressLine2: res.respones[0].Addressline2,
        city: res.respones[0].City,
        state: res.respones[0].State,
        country: res.respones[0].Country,
        pinCode: res.respones[0].Pincode,
        height: res.respones[0].height,
        weight: res.respones[0].weight,
        role: res.respones[0].Role
      })
    })
  }
  pannelback() {
    // this.router.navigateByUrl('root/doctor'); 
    if(this.userData.Role=='doctor')
    {
      this.router.navigateByUrl('root/doctor')
    }
    else if(this.userData.Role=='patient')
    {
      this.router.navigateByUrl('root/listofdoctors')
    }
    else
    {

    }
  }

}
