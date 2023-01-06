import { Component, OnInit, HostListener } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from "sweetalert2";
@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.scss'],
  providers: [DatePipe],
})
export class ProjectRequirementsComponent implements OnInit {
  iconToggle: any = [];
  cols = [
    { field: "JobId", header: "Job Id", width: "6%" },
    { field: "JobTitle", header: "Job Title", width: "9%" },
    { field: "Positions", header: "Positions", width: "9%" },
    { field: "skills", header: " Skills", width: "11%" },
    { field: "postedDate", header: "Posted Date", width: "10%" },
    { field: "Status", header: "Status", width: "7%" },
    { field: "Submissions", header: "Submissions", width: "10%" },
    { field: "", header: "Action", width: "10%" }
  ];

  // Sno
  // Patient Name
  // Phone number
  // Address
  // Appointment(date,time)
  
  // Patient Problem
  // Action(Edit, Delete)
  

 

  patientData=[
    {sno:'1',patientName:'Naga',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'fever'},
    {sno:'2',patientName:'Naga',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'fever'},
    {sno:'3',patientName:'Naga',phoneNumber:'1234567891',address:'vizag',appointment:'5-12-22',patientProblem:'fever'}
  ]

  requirementsForm: FormGroup;
  statusList: any;
  userDetails: any;
  userAccId: any;
  first: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  userRoleId: any;
  listOfRequirements: any;
  reqCount: any;
  totalRecords: any;
  skillsList: any;
  tableStatus: any;
  display: boolean;
  reqSkillsValue: any[];
  reqStartDate: string;
  reqEndDate: string;
  items: ({
  label: string; icon: string;
    // tslint:disable-next-line:no-shadowed-variable
    command: (event: any, i: any) => void;
  } | {
  label: string; icon: string;
    // tslint:disable-next-line:no-shadowed-variable
    command?: undefined;
  })[];
  reqIdData: any;
  securityReleaseResponse: any;
  loader: boolean;

  patientName:any;
  tokenNumber:any;
  patientList:any;
  
  constructor( private breadcrumbService: BreadcrumbService,private datepipe:DatePipe,private router: Router,  private fb: FormBuilder,) {
    this.breadcrumbService.setItems([
      { label: "Requirements", routerLink: "/root/requiremenent" },
     
    ]);

   }
   @HostListener("window:keydown", ["$event"])
   keyboardInput(event: any) {
     if (event.key === "Enter") {
       this.search();
     }
   }
  ngOnInit(): void {


    this.requirementsForm = this.fb.group({
    jobId:[''],
      jobTitle:[''],
      status:[''],
      startDate:[''],
    endDate:['']

    });
    
 
  }
 
  onEdit(){
    console.log("edit option selected");
  }

  onDelete()
  {
    console.log("delete seleted");
  }


  search(){
    this.loader = true;
    if (
      this.requirementsForm.controls.startDate.value === "" ||
      this.requirementsForm.controls.startDate.value === null ||
      this.requirementsForm.controls.startDate.value === undefined
    ) {
      this.reqStartDate = "";
    } else {
      const startdate =
        this.requirementsForm.controls.startDate.value;
      const reqstartDate = new Date(startdate);
      this.reqStartDate = this.datepipe.transform(
        reqstartDate,
        "MM-dd-yyyy"
      );
    }
    if (
      this.requirementsForm.controls.endDate.value === "" ||
      this.requirementsForm.controls.endDate.value === null ||
      this.requirementsForm.controls.endDate.value === undefined
    ) {
      this.reqEndDate = "";
    } else {
      const endDate =
        this.requirementsForm.controls.endDate.value;
      const reqendtDate = new Date(endDate);
      this.reqEndDate = this.datepipe.transform(
        reqendtDate,
        "MM-dd-yyyy"
      );
    }
  const jobId=  this.requirementsForm.controls.jobId.value === null
    ? ""
    : this.requirementsForm.controls.jobId.value;
    const jobTitle=  this.requirementsForm.controls.jobTitle.value === null
    ? ""
    : this.requirementsForm.controls.jobTitle.value;
    const jodStatus =   this.requirementsForm.controls.status.value === null
    ? ""
    : this.requirementsForm.controls.status.value === ""
    ? ""
    : this.requirementsForm.controls.status.value;
    const pgNo = this.page;
    const recordPage = this.rows;
    const createBy = 0;
  
  }
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
 
  
 

   
     
    
    
  addReq(){
    console.log("checck", this.requirementsForm.value);
    
    this.router.navigate(['/root/add-requiremenent']);
  }
  copyReq(data){
    this.router.navigate(['/root/copy-Requirement',data.reqId]);
  }
  reset(){
    this.requirementsForm.reset();
  }
  
 
 
  
}