import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-doctordb',
  templateUrl: './doctordb.component.html',
  styleUrls: ['./doctordb.component.scss']
})
export class DoctordbComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private service: DataService) { }
  patientName: any;
  tokenNumber: any;
  patientList: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  patientsList: any
  patientData=[]
  paginate(event) {
     let i = 1;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + i++;
    this.pageCount = event.pageCount;
  }
  
  onDelete(id:any) {
    console.log(id);
    this.service.getDeletePatient(id).subscribe((i:any)=>{
      console.log(i);
    })
    this.getData();
  }
  getData() {
    console.log("service start");
   
    console.log(this.doctorId);
    this.service.getPatientData(this.doctorId).subscribe((x: any) => {
      console.log(x.response);
      this.patientData=x.response
      console.log(this.patientData);
    })
  }
  doctorId:any
  ngOnInit(): void {
     this.doctorId=JSON.parse(sessionStorage.getItem('userId')||'[]')
    this.patientsList = this.fb.group({
      patientName: [''],
      tokenNumber: ['']
    })
    this.getData()
  }
  
}
