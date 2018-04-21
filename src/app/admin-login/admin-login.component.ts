import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { ToasterService } from '../toaster-service.service';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private tokenService:TokenService,
    private router:Router,
    private http:HttpClient,
    private toaster:ToasterService,
  ) { }

  password:string = '';
  email:string = '';
  totalUnreadFromOutside =0;
  loading= false;

  ngOnInit() {
    this.getUnreadCount();
  }

  submitLogin()
  {
    this.loading= true;
    this.http.post(`https://ralpdexterbongato.herokuapp.com/api/login`,{
      email:this.email,
      password:this.password
    }).subscribe(
      data => {
        this.handleData(data);
        this.router.navigate(['admin-panel']);
        this.toaster.Success("Ralp Dexter!","Welcome back");
        this.loading = false;
      },
      err => {
        console.log(err);
        this.toaster.Error(err.error.error,"Incorrect");
        this.loading = false;
      }
    )
  }
  handleData(data)
  {
     this.tokenService.handle(data.access_token);
  }

  getUnreadCount()
  {
    this.http.get(`https://ralpdexterbongato.herokuapp.com/api/unreadCount`).subscribe(
      data=>
      {
        console.log(data);
        this.handleUnreadCountData(data);

      },
      error=>
      {
        console.log(error);
      }
    );
  }
  handleUnreadCountData(data)
  {
    this.totalUnreadFromOutside = data;
  }



}
