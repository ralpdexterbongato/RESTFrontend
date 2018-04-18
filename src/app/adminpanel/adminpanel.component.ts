import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(
  private http:HttpClient,
  private token:TokenService,
  private router:Router,
    ) { }

  ngOnInit() {
    this.getMessages();
  }
  inboxList = [];
  pagination = [];
  showIndex = null;

  openMessage(index)
  {
    this.showIndex = index;
  }
  closeMessage()
  {
    this.showIndex = null;
  }
  getMessages()
  {
    this.http.get(`http://127.0.0.1:8000/api/message`).subscribe(
      data=>{
        console.log(data);
        this.inboxHandler(data);
      },
      err=>{
        console.log(err);
      }
    )
  }
  inboxHandler(data)
  {
    this.inboxList = data.data;
    this.pagination = data;
  }

  logout()
  {
    this.http.post(`http://127.0.0.1:8000/api/logout`,{}).subscribe(
      data=>{
        console.log(data);
        this.token.remove();
        this.router.navigate(['admin-only']);
      },
      error=>{
        console.log(error);
        this.token.remove();
        this.router.navigate(['admin-only']);
      }
    );
  }

}
