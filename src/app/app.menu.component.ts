import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

  model: any[];
  model2: any[];
  model3: any[];
  role: any;

  constructor() { }
  ngOnInit() {
    // this.model = [
    //   {
    //     items: [
    //       {
    //         label: "Home",
    //         icon: "",
    //         items: [
    //           {
    //             label: "Add Req",
    //             icon: "",
    //             routerLink: ["/root/edit-requiremenent"],
    //           },


    //         ],
    //       },

    //       {
    //         label: "Reset Password",
    //         icon: "",
    //         routerLink: ["/root/resetUserPassword"],
    //       },
    //     ],
    //   },
    // ];
    this.role = sessionStorage.getItem('role')
    if (this.role == 'admin') {
      this.model = [
        {
          items: [            
            {
              label:"List of users",
              icon:"",
              routerLink:["/root/admin"]
            }
          ],
        }
      ];
    }
    else if (this.role == 'patient') {
      this.model = [
        {
          items: [
            {
              label: "Doctors List",
              icon: "",
              routerLink: ["/root/listofdoctors"],
            },
          ],
        }
      ]
    }
    else if (this.role == 'doctor') {
      this.model = [
        {
          items: [
            {
              label: "Patients List",
              icon: "",
              routerLink: ["/root/doctor"],
            },
          ],
        }
      ]
    }
    else {

    }


  }
}
