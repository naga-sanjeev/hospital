import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-doctorslist',
  templateUrl: './doctorslist.component.html',
  styleUrls: ['./doctorslist.component.scss'],
  providers:[MessageService]
})
export class DoctorslistComponent implements OnInit {

  constructor(private service:DataService,private messageService: MessageService ) { }
  patientName: any;
  tokenNumber: any;
  patientList: any;
  rows: any = 10;
  page: any = 1;
  pageCount: any;
  first: any;
  reqCount: any;
  doctorData = [];
  rating:number;


  ngOnInit(): void {
    this.doctorData=this.service.doctorsList
    // console.log(this.doctorData);

    
    
  }
  slot(){
    this.messageService.add({severity:'success', summary:'Your slot is booked', detail:''});
    console.log(this.rating);
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
}
