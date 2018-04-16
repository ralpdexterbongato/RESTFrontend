import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'app';
  drawerIsActive = false;
  ClickCount = 0;

  toggleDrawer()
  {
    if(this.drawerIsActive==false)
    {
      this.drawerIsActive = true;
    }else
    {
      this.drawerIsActive = false;
    }
  }
  adminlogin()
  {
    this.ClickCount = this.ClickCount + 1;
    if(this.ClickCount > 30)
    {
      this.router.navigate(['admin-only']);
    }
  }

}
