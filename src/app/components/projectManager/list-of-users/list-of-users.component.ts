import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  patientName:any;
  tokenNumber:any;
  patientList:any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  usersData=[
    {sno:'1',username:'Naga',phonenumber:'1234567891',email:'naga123@gmail',address:'vizag',age:'25',role:'Doctor'},
    {sno:'2',username:'Sanjeev',phonenumber:'1234567891',email:'sanjeev@gmail',address:'vizag',age:'35',role:'Patient'},
    {sno:'3',username:'Rahul ',phonenumber:'1234567891',email:'rahul123@gmail',address:'vizag',age:'29',role:'Doctor'},
    {sno:'4',username:'Kiran',phonenumber:'1234567891',email:'kiran123@gmail',address:'vizag',age:'20',role:'Patient'},
    {sno:'5',username:'Kumar',phonenumber:'1234567891',email:'kumar123@gmail',address:'vizag',age:'27',role:'Doctor'},
    {sno:'6',username:'Ravi',phonenumber:'1234567891',email:'ravi123@gmail',address:'vizag',age:'15',role:'Patient'},
  ]
  constructor(private router:Router) { }

  ngOnInit(): void {
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
  onEdit(){
    console.log("edit option selected");
  }

  onDelete()
  {
    console.log("delete seleted");
  }

  add()
  {
    this.router.navigateByUrl('root/edit-requiremenent')
  }

}
