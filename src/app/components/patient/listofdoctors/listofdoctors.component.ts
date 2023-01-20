import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(private service: DataService, private messageService: MessageService, private fb: FormBuilder) { }
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
  minDate: Date
  maxDate: Date
  invalidDates: Array<Date>
  patientDetails: any
  patientData: boolean
  slots = []
  slotsarray: any
  // this.yesterday.setDate(today.getDate() - 1);
  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userId') || "[]")
    console.log(this.userId);
    this.getListOfDoctors();
    this.getUserData();
    this.getDate();
    // this.slots = [{ h: '10:00' }, { h: '10:15' }, { h: '10:30' }, { h: '10:45' }, { h: '11:00' }, { h: '11:15' }, { h: '11:30' }]
    this.slots = [{ h: '10:00' }, { h: '10:15' }, { h: '10:30' }, { h: '10:45' }, { h: '11:00' }, { h: '11:15' }, { h: '11:30' }]
  }

  openForm() {
    this.display = true;
  }
  getDate() {
    //to get present date
    let today = new Date();
    console.log(today);
    //to get previous date
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let date = today.getDate()
    console.log(date);
    let previousDate = (date === 0) ? 29 || 30 : date;
    console.log(previousDate);
    this.minDate = new Date()
    this.minDate.setDate(previousDate)
    let month = today.getMonth();
    let nextMonth = (month === 11) ? 0 : month + 1;
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
  }
  isEmpty(patientDetails) {
    for (var prop in patientDetails) {
      if (patientDetails.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
  getUserData() {
    this.service.getUserById(this.userId).subscribe((i: any) => {
      console.log(i);
      this.patientDetails = i.respones[0]
      console.log(this.patientDetails);
      // console.log(this.patientDetails[0].appointment);
      // console.log(typeof (this.patientDetails));
    });
  }
  slot(list: any) {


    // this.patientData=this.isEmpty(this.patientDetails);
    // console.log(this.patientData);

    // if(this.patientData==true)
    // {
    //   console.log("empty");
    //   this.messageService.add({ severity: 'success', summary: 'Your slot is booked', detail: '' });
    //     console.log(list);
    //     this.doctorId = list.Id
    //     console.log(this.doctorId);
    //     const reqBody = {
    //       "patientId": this.userId,
    //       "doctorId": list.Id
    //     }
    //     this.service.bookDoctor(reqBody).subscribe((i: any) => {
    //       console.log(i);
    //     })
    //     const body = {
    //       "appointment": list.Id
    //     }
    //     this.service.updateUsersData(body, this.userId).subscribe((i: any) => {
    //       console.log(i);
    //     })

    // }
    if (this.patientDetails.appointment == list.Id || this.patientDetails == " ") {
      console.log("slot booked");

    }
    else {
      this.messageService.add({ severity: 'success', summary: 'Your slot is booked', detail: '' });
      console.log(list.Id);
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
        "appointment": list.Id
      }
      this.service.updateUsersData(body, this.userId).subscribe((i: any) => {
        console.log(i);
        this.getUserData();
        console.log("get doctor details");
        console.log(this.patientDetails);
      })
    }
  }
  display: boolean = false
  slotbox() {
    this.display = true
  }
  slotTime(slot: any, index: any) {
    console.log(slot);
    console.log(index);

  }

  getListOfDoctors() {
    this.service.getDoctorsdata().subscribe((i: any) => {
      console.log(i);
      this.doctorData = i.response
      console.log(this.doctorData)   
      for(var j=0;j<this.doctorData.length;j++)
    {
      console.log(this.doctorData[j].availbility) 
      let date = new Date();
      const intervalMinutes = 15;
      const dom = date.getDate();
      let times=[]
      do {
          times.push(date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }))
          date = new Date(date.setMinutes(date.getMinutes() + intervalMinutes));
      } while (date.getDate() === dom)
      console.log("Time slots:",times);
    }
    })
    console.log(this.doctorData)
    
   
  }
}