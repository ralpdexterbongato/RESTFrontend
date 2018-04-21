import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from '../toaster-service.service';
import { SendLimitService } from '../services/sendlimit.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private httpClient:HttpClient,
    private toasterService:ToasterService,
    private sendLimit: SendLimitService,
  ) { }

  ngOnInit() {

  }

  cfullname = '';
  cemail = '';
  cbudget = '';
  cmessage = '';
  loading = false;
  submitMessage()
  {
    var cansend =this.sendLimit.CanSend();
    if(cansend == false)
    {
      this.toasterService.Error("You have reach the maximum send");
      return false;
    }
    this.loading=true;
    var vm=this;
    if(confirm("Submit message?"))
    {
      this.httpClient.post(`https://ralpdexterbongato.herokuapp.com/api/message`,{
        cfullname: this.cfullname,
        cemail: this.cemail,
        cbudget : this.cbudget,
        cmessage : this.cmessage,
      })
    .subscribe(
      res => {
        console.log(res);
          vm.toasterService.Success("Your message has been sent","Success!");
          vm.cfullname = '';
          vm.cemail = '';
          vm.cbudget = '';
          vm.cmessage = '';
          vm.sendLimit.incrementCount();
          this.loading = false;
      },
      err => {
        console.log(err);
        vm.toasterService.Error("Please check your inputs","Invalid");
        this.loading = false;
      }
    )
    }
  }

}
