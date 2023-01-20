import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admindb',
  templateUrl: './admindb.component.html',
  styleUrls: ['./admindb.component.scss']
})
export class AdmindbComponent implements OnInit {

  constructor(private router: Router, private service: DataService,private fb:FormBuilder) { }
  patientList: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  usersData: any = []
  searchForm:any
  ngOnInit(): void {
    this.getTableData()
    this.searchForm=this.fb.group({
      userName:[],
      role:[]
    })
  }
  getTableData() {
    this.service.geUserstData().subscribe((x: any) => {
      console.log(x.respones);
      this.usersData=x.respones
    })

  }

  onEdit(data: any) {
    console.log("edit option selected");
    console.log(data);
    localStorage.setItem('userseditdata', JSON.stringify(data))
    this.router.navigateByUrl('root/edit');
  }
  onDelete(data: any) {
    console.log(data);
    this.service.deleteUser(data).subscribe((i: any) => {
      console.log(i);
    })
    this.getTableData()
  }

  add() {
    this.router.navigateByUrl('root/addusers')
  }
  order:boolean=true
  sortData(){
    // if(this.order)
    // {
    //   let newarr=this.usersData.sort((a,b)=>a.Id-b.Id)
    //   this.usersData=newarr
    // }
    // else{
    //   let newarr=this.usersData.sort((a,b)=>b.Id-a.Id)
    //   this.usersData=newarr
    // }
    // this.order=!this.order
  }
  search(){
    console.log("values:",this.searchForm.controls);
    
    // if (searchValue !== "") {
    //   const filteredData = data.filter((item) => {
    //   return Object.values(item.Firstname).join('').toLowerCase().includes(searchValue.toLowerCase())
    //   }
  }
}
