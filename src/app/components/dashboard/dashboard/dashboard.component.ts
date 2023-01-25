import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/app.main.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute,public app: AppComponent,public appMain: AppMainComponent) {
    this.role=sessionStorage.getItem('role');
      console.log(this.role);
      if(this.role=="admin")
      {
        this.role="Admin"
      }
      else if(this.role=='patient')
      {
        this.role='Patient'
      }
      else if(this.role=='doctor')
      {
        this.role='Doctor'
      }
  }
    currenYearFormat:number = new Date().getFullYear();
  role:any
  fullName:any
  profile(){
    this.router.navigateByUrl("root/profile")
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("");
  }
  title = 'TaskManagement';
  items: MenuItem[]=[];
  item2 : MenuItem[]=[];
   dot: false | undefined;
  ngOnInit(): void {
  this.item2=[{
    label:'List',
    icon:'pi pi-list',
  
  },
  {
    label:'Dashboard',
    icon:'pi pi-fw pi-calendar-times',
    items:[
    {
        label:'Remove',
        icon:'pi pi-fw pi-calendar-minus'
    }
    ]
  },
  {
    label:'Users',
    icon:'pi pi-fw pi-user',
    items:[
        {
            label:'New',
            icon:'pi pi-fw pi-user-plus',
  
        },
        {
            label:'Delete',
            icon:'pi pi-fw pi-user-minus',
  
        },
    
        
    ]
  },
  {
    label:'TImeline',
    icon:'pi pi-fw pi-power-off',
    routerLink:['calender']
  }
  
  ]
  this.items = [
  {
  label: 'Home',
  icon: 'pi pi-pw pi-file' ,
  routerLink : ['home']
  },
  {
  label: 'doctors',
  icon: 'pi pi-fw pi-book',
  // command: () => addNewTask(),
  routerLink : ['doctors']
   
  },
  {
  label: 'patients',
  icon: 'pi pi-fw pi-question',

  },
  {
  label: 'Reporting',
  icon: 'pi pi-fw pi-cog',
  items: [
  {
  label: 'Add project',
  icon: 'pi pi-fw pi-pencil',
  items: [
  {label: 'Save', icon: 'pi pi-fw pi-save'},
  {label: 'Update', icon: 'pi pi-fw pi-save'},
  ]
  },
  {
  label: 'add task',
  icon: 'pi pi-fw pi-pencil',
  items: [
  {label: 'Delete', icon: 'pi pi-fw pi-minus'}
  ]
  }
  ]
  }
  ];
  }


}
function addNewUser(): void {
  throw new Error('Function not implemented.');
}

function addNewTask(): void {
  throw new Error('Function not implemented.');
}