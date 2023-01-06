import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admindb',
  templateUrl: './admindb.component.html',
  styleUrls: ['./admindb.component.scss']
})
export class AdmindbComponent implements OnInit {

  constructor(private router: Router, private service: DataService) { }
  patientName: any;
  tokenNumber: any;
  patientList: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  usersData: any = []

  ngOnInit(): void {
    this.getTableData()
  }
  getTableData() {
    this.service.geUserstData().subscribe((x: any) => {
      console.log(x.respones);
      this.usersData=x.respones
    })
  }
  paginate(event) {
    let i = 1;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + i++;
    this.pageCount = event.pageCount;
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

}
