import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private service: DataService, private messageService: MessageService, private fb: FormBuilder,private router:Router) { }
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
  slots: any = []
  slotsarray: any
  selectedtime: any
  sloatForm: any
  datesarray = new Date()
  patientdetails: any = []
  date: any
  time: any
  time2: any
  value: boolean
  feedbackForm:any
  display: boolean = false
  feedback:any
  ratings:any
  // this.yesterday.setDate(today.getDate() - 1);
  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userId') || "[]")
    console.log(this.userId);
    this.getListOfDoctors();
    this.getUserData();
    this.getDate();
    // this.slots = [{ h: '10:00' }, { h: '10:15' }, { h: '10:30' }, { h: '10:45' }, { h: '11:00' }, { h: '11:15' }, { h: '11:30' }]
    this.slots = [{ h: '2:15 PM' }, { h: '2:30 PM' }, { h: '2:45PM' }, { h: '3:00 PM' }, { h: '3:15 PM' }, { h: '3:30PM' }, { h: '3:45PM' }]
    this.sloatForm = this.fb.group({
      date: [''],
      time: [''],
      t2: ['']
    })
    this.feedbackForm=this.fb.group({
      feedback:[''],
      ratings:['']
    })
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
    this.time = this.sloatForm.controls.t2.value
    // console.log(this.convert(date));
    this.date = this.convert(this.sloatForm.controls.date.value);
    console.log(this.date)
    console.log(this.time)
    console.log(this.time.h);
    this.time2 = this.time.h
    this.service.getPatientData(list.Id).subscribe((x: any) => {
      this.patientdetails = x.response
      console.log(this.patientdetails.length);
      console.log(this.patientDetails);
      if (this.date == " " || this.time == "") {
        this.messageService.add({ severity: 'error', summary: 'Date  and Time is required to book the slot', detail: '' });
      }
      else if (this.patientdetails.length == 0) {
        if (this.date == " " || this.time == "") {
          this.messageService.add({ severity: 'error', summary: 'Date  and Time is required to book the slot', detail: '' });
        }
        else {
          this.slotBooking(list)
        }
      }
      else if (this.patientdetails.length > 0) {
        for (var i = 0; i < this.patientdetails.length; i++) {
          console.log(this.patientdetails[i].date);
          console.log(this.patientdetails);

          if (this.date == this.patientdetails[i].date && this.time.h == this.patientdetails[i].timeslot) {
            this.value = false;
          }
          else {
            this.value = true;
          }
        }
      }
      if (this.value == true) {
        this.slotBooking(list)
      }
      else if (this.value == false && this.patientdetails.length > 0) {
        console.log("your slot is already  booked");
        this.messageService.add({ severity: 'error', summary: 'Slot is already booked', detail: '' });
      }
    })
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  slotBooking(list: any) {
    this.messageService.add({ severity: 'success', summary: 'Your slot is booked', detail: '' });
    console.log(list.Id);
    this.doctorId = list.Id
    console.log(this.doctorId);
    const reqBody = {
      "patientId": this.userId,
      "doctorId": list.Id,
      "date": this.date,
      "timeslot": this.time.h
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
  slotTime(slot: any, index: any) {
    console.log(slot);
    console.log(index);
  }
  getListOfDoctors() {
    this.service.getDoctorsdata().subscribe((i: any) => {
      console.log(i);
      this.doctorData = i.response
      console.log(this.doctorData)
      for (var j = 0; j < this.doctorData.length; j++) {
        console.log(this.doctorData[j].availbility)
        let date = new Date();
        const intervalMinutes = 15;
        const dom = date.getDate();
        let times = []
        do {
          times.push(date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }))
          date = new Date(date.setMinutes(date.getMinutes() + intervalMinutes));
        } while (date.getDate() === dom)
        // console.log("Time slots:",times);
      }
    })
    console.log(this.doctorData)
  }
  feedBack(){
    this.display = true
  }
  submitFeedBack(){
    console.log("feedback:",this.feedbackForm.controls);
    this.feedback=this.feedbackForm.controls.feedback.value
    this.ratings=this.feedbackForm.controls.ratings.value
    console.log(this.feedback);
    console.log(this.ratings);

    const reqBody = {
      "patientId": this.userId,
      "feedback":this.feedback,
      "rating":this.ratings,
    }
    this.service.bookDoctor(reqBody).subscribe((i: any) => {
      console.log(i);
    })
    this.feedbackForm.reset();
    
  }
}