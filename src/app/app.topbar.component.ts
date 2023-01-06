import { Component } from '@angular/core';
import { AppComponent} from './app.component';
import { AppMainComponent} from './app.main.component';
import { Router } from '@angular/router';
// import { EditRequirementsComponent } from './components/projectManager/edit-requirements/edit-requirements.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    loginRoleName: any;
  fullName: any;
  role:any
    constructor(public app: AppComponent,   public router: Router,public appMain: AppMainComponent,) {
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
    profile(){
      this.router.navigateByUrl("root/profile")
    }
    logout() {
      sessionStorage.clear();
      this.router.navigateByUrl("/login");
    }
}
