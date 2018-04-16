import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from '../toaster-service.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private httpClient:HttpClient,private toasterService:ToasterService) { }

  ngOnInit() {

  }

  cfullname = '';
  cemail = '';
  cbudget = '';
  cmessage = '';

  submitMessage()
  {
    var vm=this;

    if(confirm("Submit message?"))
    {
      this.httpClient.post(`http://127.0.0.1:8000/message`,{
        cfullname: this.cfullname,
        cemail: this.cemail,
        cbudget : this.cbudget,
        cmessage : this.cmessage,
      })
    .subscribe(
      res => {
        console.log(res);
        if(false)
        {

        }else
        {
          vm.toasterService.Success("Your message has been sent","Success!");
          vm.cfullname = '';
          vm.cemail = '';
          vm.cbudget = '';
          vm.cmessage = '';
        }
      },
      err => {
        console.log(err);
        vm.toasterService.Error("Please check your inputs","Invalid");
      }
    )
    }
  }

}
