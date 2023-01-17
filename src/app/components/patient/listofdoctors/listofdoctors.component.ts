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
  minDate:Date
  maxDate:Date
  invalidDates: Array<Date>
  patientDetails:any
  patientData:boolean
  // this.yesterday.setDate(today.getDate() - 1);
  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userId') || "[]")
    console.log(this.userId);
    this.getListOfDoctors();
    //to get present date
    let today = new Date();  
    console.log(today);
    //to get previous date
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let date=today.getDate()
    console.log(date);
    let previousDate=(date===0)?29||30:date;
    console.log(previousDate);
    this.minDate=new Date()
    this.minDate.setDate(previousDate)
    let month = today.getMonth();
    let nextMonth = (month === 11) ? 0 : month + 1;
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
  }
  isEmpty(patientDetails) {
      for(var prop in patientDetails) {
        if(patientDetails.hasOwnProperty(prop))
            return false;
    }
    return true;
}
  slot(list: any) {
    this.service.getUserById(this.userId).subscribe((i:any)=>{
      this.patientDetails=i.respones
      // console.log(this.patientDetails[0].appointment);
      console.log(typeof(this.patientDetails));
    });
    this.patientData=this.isEmpty(this.patientDetails);
    console.log(this.patientData);
    
    if(this.patientData==true)
    {
      console.log("empty");
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
          "appointment": list.Id
        }
        this.service.updateUsersData(body, this.userId).subscribe((i: any) => {
          console.log(i);
        })
      
    }
      // if(this.patientDetails[0].appointment==list.Id||this.patientDetails==" ")
      // {
      //   console.log("slot booked");
      // }
      // else
      // {
      //   this.messageService.add({ severity: 'success', summary: 'Your slot is booked', detail: '' });
      //   console.log(list);
      //   this.doctorId = list.Id
      //   console.log(this.doctorId);
      //   const reqBody = {
      //     "patientId": this.userId,
      //     "doctorId": list.Id
      //   }
      //   this.service.bookDoctor(reqBody).subscribe((i: any) => {
      //     console.log(i);
      //   })
      //   const body = {
      //     "appointment": list.Id
      //   }
      //   this.service.updateUsersData(body, this.userId).subscribe((i: any) => {
      //     console.log(i);
      //   })
      // }
    
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