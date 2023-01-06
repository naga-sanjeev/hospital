import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
  currenYearFormat:number = new Date().getFullYear();
}
