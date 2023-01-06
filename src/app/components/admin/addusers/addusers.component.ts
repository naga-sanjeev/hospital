import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss'],
  providers: [MessageService]
})
export class AddusersComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private service: DataService, private https: HttpClient, private messageService: MessageService) { }
  gender: any;
  roles: any
  selectRole: any;
  addDoctor: boolean = false;
  addPatient: boolean = false;
  nothing: boolean = true;
  regForm: any
  isDisable = false
  ngOnInit(): void {
    this.roles = [
      { role: 'doctor' },
      { role: 'patient' }
    ];

    this.gender = [
      { gen: 'male' },
      { gen: 'female' }
    ]

    this.regForm = this.fb.group({
      firstName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      middleName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      lastName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("([0-9]{10,15}$)"),]],
      alternativeNumber: ['', [Validators.pattern("^[0-9]{10}$"),]],
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
      bloodGroup: [''],
      role: ['', [Validators.required]],//doctor or patient
      designation: [''],
      availbility: [''],
      patientProblem: ['']
    })
    this.regForm.get('role').valueChanges.subscribe((data: any) => {
      this.changeValidators()
    })
    this.updateUsersData()
  }
  changeValidators() {
    console.log(this.regForm.get('role').value);
    if (this.regForm.get("role").value == 'doctor') {
      this.regForm.controls['availbility'].setValidators([Validators.required])
      this.regForm.controls['designation'].setValidators([Validators.required])
      this.regForm.controls['bloodGroup'].clearValidators()
      this.regForm.controls['patientProblem'].clearValidators()
    }
    else {
      this.regForm.controls['bloodGroup'].setValidators([Validators.required])
      this.regForm.controls['patientProblem'].setValidators([Validators.required, Validators.maxLength(30)])
      this.regForm.controls['availbility'].clearValidators()
      this.regForm.controls['designation'].clearValidators()
    }
    this.regForm.get('availbility').updateValueAndValidity();
    this.regForm.get('designation').updateValueAndValidity();
    this.regForm.get('bloodGroup').updateValueAndValidity();
    this.regForm.get('patientProblem').updateValueAndValidity();
  }
  onChange() {
    this.selectRole = this.regForm.controls.role.value
    if (this.selectRole == "doctor") {
      this.addDoctor = true;
      this.addPatient = false;
      this.nothing = false
    }
    else if (this.selectRole == "patient") {
      this.addPatient = true;
      this.addDoctor = false;
      this.nothing = false;
    }
  }

  backRouting() {
    // this.router.navigate(['/root/project-requirements']);
  }
  pannelback() {
    this.router.navigate(["root/admin"])
  }
  submit() {
    console.log('form registration: ', this.regForm)
    if (this.regForm.invalid || this.regForm.get('role').invalid) {
      console.log("invalid");
      const controls = this.regForm.controls;
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    }
    else {
      const reqBody = {
        "Role": this.regForm.controls.role.value,
        "Firstname": this.regForm.controls.firstName.value,
        "Middlename": this.regForm.controls.middleName.value,
        "LastName": this.regForm.controls.lastName.value,
        "Email": this.regForm.controls.email.value,
        "PhoneNumber": this.regForm.controls.phoneNumber.value,
        "Age": this.regForm.controls.age.value,
        "username": this.regForm.controls.userName.value,
        "password": this.regForm.controls.password.value,
        "Gender": this.regForm.controls.gender.value,
        "Addressline1": this.regForm.controls.addressLine1.value,
        "Addressline2": this.regForm.controls.addressLine2.value,
        "State": this.regForm.controls.state.value,
        "Pincode": this.regForm.controls.pinCode.value,
        "AlternativeNumber": this.regForm.controls.alternativeNumber.value,
        "City": this.regForm.controls.city.value,
        "Country": this.regForm.controls.country.value,
        "Bloodgroup": this.regForm.controls.bloodGroup.value,
        "patientproblem": this.regForm.controls.patientProblem.value,
        "height": this.regForm.controls.height.value,
        "weight": this.regForm.controls.weight.value,
        "designation": this.regForm.controls.designation.value,
        "availbility": this.regForm.controls.availbility.value,
        "appointment": "null",
        "doc_prescription_1": "null",
        "doc_prescription_2": "null"

      }

      console.log(reqBody);

      this.service.postUserData(reqBody).subscribe((i: any) => {
        console.log("postdata enter");
        console.log(i);
      })

    }


    // const reqBody = {
    //   "Role": this.regForm.controls.role.value,
    //   "Firstname": this.regForm.controls.firstName.value,
    //   "Middlename": this.regForm.controls.middleName.value,
    //   "LastName": this.regForm.controls.lastName.value,
    //   "Email": this.regForm.controls.email.value,
    //   "PhoneNumber": this.regForm.controls.phoneNumber.value,
    //   "Age": this.regForm.controls.age.value,
    //   "username": this.regForm.controls.userName.value,
    //   "password": this.regForm.controls.password.value,
    //   "Gender": this.regForm.controls.gender.value,
    //   "Addressline1": this.regForm.controls.addressLine1.value,
    //   "Addressline2": this.regForm.controls.addressLine2.value,
    //   "State": this.regForm.controls.state.value,
    //   "Pincode": this.regForm.controls.pinCode.value,
    //   "AlternativeNumber": this.regForm.controls.alternativeNumber.value,
    //   "City": this.regForm.controls.city.value,
    //   "Country": this.regForm.controls.country.value,
    //   "Bloodgroup": this.regForm.controls.bloodGroup.value,
    //   "patientproblem": this.regForm.controls.patientProblem.value,
    //   "height": this.regForm.controls.height.value,
    //   "weight": this.regForm.controls.weight.value,
    //   "designation": this.regForm.controls.designation.value,
    //   "availbility": this.regForm.controls.availbility.value,
    //   "appointment": "null",
    //   "doc_prescription_1": "null",
    //   "doc_prescription_2": "null"
    // }

    // console.log(reqBody);
    // this.service.postUserData(reqBody).subscribe((i: any) => {
    //   console.log("postdata enter");
    //   console.log(i);
    //   if (i.status == 'sucess') {
    //     this.messageService.add({ severity: 'success', summary: i.respones, detail: i.recordId });
    //   }
    // })

  }
  updateUsersData() {
    const data = JSON.parse(localStorage.getItem('userseditdata') || '[]')
    console.log(data.username);

  }
  reset() {
    this.regForm.reset();
  }

}
