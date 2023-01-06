import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Command } from 'protractor';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.scss']
})
export class EditpatientComponent implements OnInit {

items:MenuItem[];

step:any=0
patientPersonalForm:any
patientRecordForm:any
  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
   
    this.patientPersonalForm =this.fb.group({
      firstName:['',[Validators.minLength(5),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      middleName:['',[Validators.minLength(5),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      lastName:['',[Validators.minLength(5),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern("")]],
      alternateNumber:['',[Validators.pattern("")]],
      age:['',[Validators.maxLength(2),Validators.pattern("")]],
      addresLine1:[''],
      addressLine2:[''],
      city:['',[Validators.minLength(5),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      state:['',[Validators.minLength(5),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      country:['',[Validators.minLength(3),Validators.pattern('^[a-zA-Z]*'),Validators.maxLength(30)]],
      pinCode:[]
    })

    this.patientRecordForm=this.fb.group({
      patientProblem:[''],
      labReports:[''],
      scanningReports:[''],
      doctorDescriptionLine1:[''],
      doctorDescriptionLine2:[''],
    })

    this.items=[
      {
        label:'Patient Personal Data',
        // command:(event:any)=>{
        //     this.index=0  
        //     console.log(this.index);
        // }
      },
      {
        label:'Patient Health Record',
        // command:(event:any)=>{
          
        //   console.log(this.index);
        // }
      }
    ]

  }

  next(){
    this.step=1
  }
  back(){
    this.step=0
  }

  pannelback(){
    this.router.navigateByUrl("root/patientlist")
  }

}
