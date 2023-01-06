import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-edit-requirements',
  templateUrl: './edit-requirements.component.html',
  styleUrls: ['./edit-requirements.component.scss'],
  providers: [DatePipe]
})
export class EditRequirementsComponent implements OnInit {
  editRequirementsForm: FormGroup
  userDetails: any;
  userAccId: any;
  endDisplay: boolean;
  skillsList: any;
  billingList: any;
  hireTypeList: any;
  exprienceList: any;
  locationList: any;
  departmentList: any;
  jobTitleData: any;
  positionData: any;
  reqData: any;
  loader: boolean = true;
  statusList: any;
  reqId: any;
  editRequirementsFromDate: any;
  editRequirementsEndDate: any;
  editRequirementData: any;
  receivedCandidates: FormGroup
  cols = [
    { field: "JobId", header: "Vendor Name", width: "10%" },
    { field: "JobTitle", header: "Candidate Name", width: "9%" },
    { field: "Positions", header: "Received Date", width: "9%" },
    { field: "skills", header: " Skills", width: "11%" },

    { field: "Status", header: "Status", width: "7%" },
    { field: "Submissions", header: "Bill Rate", width: "10%" },
    { field: "", header: "Action", width: "10%" }
  ];

  maxrate: any;
  reqName: any;
  recCandidates: boolean;
  recCandidateRecords: any;
  recCandidateGrid: any;
  roles: any;
  gender: any;
  selectRole: any;
  addDoctor: boolean = false;
  addPatient: boolean = false;
  regForm: any
  constructor(private fb: FormBuilder, private datepipe: DatePipe, private router: Router, private breadcrumbService: BreadcrumbService,) {
    this.breadcrumbService.setItems([
      { label: "Requirements", routerLink: "/root/requiremenent" },
      { label: "Edit-Requirements", routerLink: "/root/edit-requiremenent" },
    ]);
  }

  ngOnInit(): void {
    this.roles = [
      { role: 'doctor' },
      { role: 'patient' }
    ];

    this.gender = [
      { gen: 'male' },
      { gen: 'female' }
    ]


    this.editRequirementsForm = this.fb.group({
      positionTitle: ['', [Validators.required]],
      positionCategory: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      department: ['', [Validators.required]],
      minRate: [''],
      maxRate: [''],
      positions: ['', [Validators.required]],
      workLocation: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      hireType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      billingType: ['', [Validators.required]],
      duration: [''],
      perWeek: [''],
      status: [''],
      preferredSkills: ['', [Validators.required]],
      requirementsSkillSet: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      comments: ['']

    })
    this.receivedCandidates = this.fb.group({
      fristName: [''],
      lastName: [''],
      email: [''],
      skillSet: [''],
      status: ['']
    })

    this.regForm = this.fb.group({
      firstName: ['', [ Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      middleName: ['', [ Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      lastName: ['', [ Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*"), Validators.minLength(10), Validators.maxLength(15)]],
      alternativeNumber: ['', [Validators.pattern("^[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      age: ['', [Validators.maxLength(2), Validators.minLength(2), Validators.pattern("^[0-9]*"), Validators.required]],
      // age:['',[Validators.pattern("^[0-9]*{2}")]],
      userName: ['', [Validators.pattern("^[a-zA-Z]*"), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      gender: ['', [Validators.required]],
      addressLine1: ['',[Validators.maxLength(60)]],
      addressLine2: ['',[Validators.maxLength(60)]],
      city: ['',[Validators.maxLength(30)]],
      state: ['',[Validators.maxLength(30)]],
      country: ['',[Validators.maxLength(20)]],
      pinCode: ['',[Validators.pattern("^[0-9]*")]],
      // city: ['', [Validators.minLength(5), Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      // state: ['', [Validators.minLength(5), Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      // country: ['', [Validators.minLength(3), Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30)]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      role: ['', [Validators.required]],//doctor or patient
      designation: ['', [Validators.required]],
      availbility: ['', [Validators.required]],
      // photo: [],
      patientProblem: ['', [Validators.required, Validators.maxLength(30)]],
      // description: ['', [Validators.required, Validators.minLength(30)]]
    })
  }

  goto() { }
  onChange() {
    this.selectRole = this.regForm.get('role').value
    if (this.selectRole == "doctor") {
      this.addDoctor = true;
      this.addPatient = false;
    }
    else if (this.selectRole == "patient") {
      this.addPatient = true;
      this.addDoctor = false;
    }
  } getRolesBasedonCategory(event) {
    console.log(">>>>>>>postion Cat Id", event, this.userAccId)

    // return this.jobTitleData 
  }





  updateRequirement() {
    console.log(this.editRequirementsForm.value);
    if (this.editRequirementsForm.invalid) {
      console.log("validation required fields");
      const controls = this.editRequirementsForm.controls;
      // this.editRequirementsForm.get("requirementsEndtDate").markAsUntouched();
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    } else {

     }

  }
  backRouting() {
    this.router.navigate(['/root/project-requirements']);
  }
  pannelback() {
    this.router.navigate(["root/userslist"])
  }
  submit() {
console.log(this.regForm.value);
    if (this.regForm.invalid) {
      console.log("validation required fields");
      const controls = this.regForm.controls;
      // this.editRequirementsForm.get("requirementsEndtDate").markAsUntouched();
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    } else {

     }
  }
  reset() {

  }
}