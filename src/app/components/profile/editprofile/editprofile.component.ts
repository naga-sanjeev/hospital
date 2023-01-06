import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: DataService) { }
  editProfile: any
  gender: any
  editdata: any;
  exclude: string[] = ['role', 'gender'];
  ngOnInit(): void {
    this.getUserData()
    this.gender = [
      { gen: 'male' },
      { gen: 'female' }
    ]
    this.editProfile = this.fb.group({
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
    console.log(this.route.snapshot.params.id);
    this.service.getUserById(this.route.snapshot.params.id).subscribe((res: any) => {
      console.log(res);
      this.editdata = res.respones;
      console.log(this.editdata);
      this.editProfile.patchValue({
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
        role: res.respones[0].Role,
      });
    })
  }
  pannelback() {
    this.router.navigateByUrl('/root/profile')
  }
  update() {
    console.log("update");
    if (this.editProfile.invalid || this.editProfile.get('role').invalid) {
      console.log("invalid");
      const controls = this.editProfile.controls;
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    }
    else {
      const reqBody = {
        "Firstname": this.editProfile.controls.firstName.value,
        "Middlename": this.editProfile.controls.middleName.value,
        "LastName": this.editProfile.controls.lastName.value,
        "Email": this.editProfile.controls.email.value,
        "PhoneNumber": this.editProfile.controls.phoneNumber.value,
        "Age": this.editProfile.controls.age.value,
        "Role": this.editProfile.controls.role.value,
        "CreatedBy": "null",
        "username": this.editProfile.controls.userName.value,
        "password": this.editProfile.controls.password.value,
        "Gender": this.editProfile.controls.gender.value,
        "Addressline1": this.editProfile.controls.addressLine1.value,
        "Addressline2": this.editProfile.controls.addressLine2.value,
        "State": this.editProfile.controls.state.value,
        "Pincode": this.editProfile.controls.pinCode.value,
        "AlternativeNumber": this.editProfile.controls.alternativeNumber.value || "null",
        "City": this.editProfile.controls.city.value,
        "Country": this.editProfile.controls.country.value,
        "Bloodgroup": "null",
        "patientproblem": "null",
        "height": this.editProfile.controls.height.value,
        "weight": this.editProfile.controls.weight.value,
        "designation": "null",
        "availbility": "null",
        "appointment": "null",
        "doc_prescription_1": "null",
        "doc_prescription_2": "null"
      }
      console.log(reqBody);
      console.log();

      this.service.updateUsersData(reqBody, this.route.snapshot.params.id).subscribe((x: any) => {
        console.log("update");
        console.log(x);
      })
    }
  }
  reset() {
    Object.keys(this.editProfile.controls).forEach(key => {
      if (this.exclude.findIndex(q => q === key) === -1) {
        this.editProfile.get(key).reset();
      }
    });
  }
}
