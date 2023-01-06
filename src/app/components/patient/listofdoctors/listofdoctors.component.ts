import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/data.service';
import { LogincComponent } from '../../loginc/loginc.component';
@Component({
  selector: 'app-listofdoctors',
  templateUrl: './listofdoctors.component.html',
  styleUrls: ['./listofdoctors.component.scss'],
  providers: [MessageService]
})
export class ListofdoctorsComponent implements OnInit {
  constructor(private service: DataService, private messageService: MessageService) { }
  patientName: any;
  tokenNumber: any;
  patientList: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  doctorData = [];
  rating: number;
  list: any
  slotbtn: boolean
  isDisabled: boolean = false;
  doctorId: any
  userId: any
  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userId') || "[]")
    console.log(this.userId);
    this.getListOfDoctors();
    //  this.slot(this.doctorId);
  }
  slot(list: any) {
    this.messageService.add({ severity: 'success', summary: 'Your slot is booked', detail: '' });
    console.log(list);
    this.doctorId = list.Id
    console.log(this.doctorId);
    const reqBody = {
      "patientId": this.userId,
      "doctorId": list.Id
    }
    this.service.bookDoctor(reqBody).subscribe((i: any) => {
      console.log(i);
    })
    const body = {
      "appointment": list.availbility
    }
    this.service.updateUsersData(body, this.userId).subscribe((i: any) => {
      console.log(i);
    })
  }
  paginate(event) {
    let i = 1;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + i++;
    this.pageCount = event.pageCount;
  }
  getListOfDoctors() {
    var j = 0
    this.service.getDoctorsdata().subscribe((i: any) => {
      console.log(i);
      this.doctorData = i.response
      console.log(this.doctorData);
    })
  }
}