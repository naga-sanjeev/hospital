import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  patientName:any;
  tokenNumber:any;
  patientList:any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  patientsList:any
  patientData=[
    {sno:'1',patientName:'Naga',phoneNumber:'1234567891',address:'vizag',appointment:'7-12-22',patientProblem:'fever'},
    {sno:'2',patientName:'Sanjeev',phoneNumber:'1234567891',address:'vizag',appointment:'10-12-22',patientProblem:'cough'},
    {sno:'3',patientName:'Rahul ',phoneNumber:'1234567891',address:'vizag',appointment:'12-12-22',patientProblem:'headache'},
    {sno:'4',patientName:'Kiran',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'stomach pain'},
    {sno:'5',patientName:'Kumar',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'leg injury'},
    {sno:'6',patientName:'Ravi',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'chest pain'},
  ]
  paginate(event) {
    // console.log("server side pagination", event);
    let i = 1;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + i++;
    this.pageCount = event.pageCount;
    // console.log(this.page);
    // this.getRequirementsList()
  }
  onEdit(){
    console.log("edit option selected");
    this.router.navigateByUrl('root/editpatient')
  }

  onDelete()
  {
    console.log("delete seleted");
  }


  constructor( private router:Router,private fb:FormBuilder) { }
  add(){
    // this.router.navigate(["/edit-requirement"])
    // this.router.navigateByUrl('root/edit-requiremenent')
  }
  ngOnInit(): void {
    this.patientsList=this.fb.group({
      patientName:['',[Validators.required]],
      tokenNumber:['',[Validators.required]]
    })
  }

}
