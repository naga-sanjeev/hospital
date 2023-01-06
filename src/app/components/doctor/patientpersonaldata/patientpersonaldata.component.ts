import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-patientpersonaldata',
  templateUrl: './patientpersonaldata.component.html',
  styleUrls: ['./patientpersonaldata.component.scss']
})
export class PatientpersonaldataComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router,private route:ActivatedRoute,private service:DataService) { }
  items: MenuItem[];
  step: any = 0
  patientPersonalForm: any
  patientRecordForm: any
  ngOnInit(): void {
    this.getPatientData()
    this.patientPersonalForm = this.fb.group({
      firstName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      middleName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      lastName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("")]],
      alternateNumber: ['', [Validators.pattern("")]],
      age: ['', [Validators.maxLength(2), Validators.pattern("")]],
      addresLine1: [''],
      addressLine2: [''],
      city: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      state: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      country: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      pinCode: []
    })

    this.patientRecordForm = this.fb.group({
      patientProblem: [''],
      labReports: [''],
      scanningReports: [''],
      doctorDescriptionLine1: [''],
      doctorDescriptionLine2: [''],
    })

    this.items = [
      {
        label: 'Patient Personal Data',
        // command:(event:any)=>{
        //     this.index=0  
        //     console.log(this.index);
        // }
      },
      {
        label: 'Patient Health Record',
        // command:(event:any)=>{

        //   console.log(this.index);
        // }
      }
    ]
  }
  getPatientData(){
    console.log(this.route.snapshot.params.id); 
    this.service.getUserById(this.route.snapshot.params.id).subscribe((res:any)=>{
      console.log(res.respones);
      this.patientPersonalForm.patchValue({
      firstName: res.respones[0].Firstname,
      middleName:res.respones[0].Middlename ,
      lastName:res.respones[0].LastName ,
      email: res.respones[0].Email,
      phoneNumber: res.respones[0].PhoneNumber,
      alternateNumber:res.respones[0].AlternativeNumber,
      age: res.respones[0].Age,
      addresLine1: res.respones[0].Addressline1,
      addressLine2: res.respones[0].Addressline2,
      city: res.respones[0].City,
      state: res.respones[0].State,
      country:res.respones[0].Country,
      pinCode: res.respones[0].Pincode
      })
    })
  }
  getPatientDescription(){
    console.log(this.route.snapshot.params.id); 
    const reqBody={
      "doc_prescription_1":this.patientRecordForm.controls.doctorDescriptionLine1.value ,
      "doc_prescription_2":this.patientRecordForm.controls.doctorDescriptionLine2.value 
    }
    console.log(reqBody);
    this.service.getprescription(this.route.snapshot.params.id,reqBody).subscribe((i:any)=>{
      console.log(i);
    })
  }
  submit(){
    this.getPatientDescription();
    console.log(this.patientRecordForm.controls.doctorDescriptionLine1.value);
  }
  next() {
    this.step = 1
  }
  back() {
    this.step = 0
  }
  pannelback() {
    this.router.navigateByUrl("root/doctor")
  }
}
