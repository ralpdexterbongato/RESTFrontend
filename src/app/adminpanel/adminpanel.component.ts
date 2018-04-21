import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster-service.service';
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
  private toaster:ToasterService,
    ) { }


  ngOnInit() {
    this.getMessages(1);
    this.displayBookMarks(1);
    this.getStatistics();
  }
  openedIndex = null;
  inboxList = [];
  currentpage=1;
  nextPageUrl = null;
  getType = "all";
  bookMarkList = [];
  currentlyOpen=[];

  loading = false;

  totalBookmark=0;
  totalUnread =0;
  totalRead = 0;
  totalvisits = 0;
  totalMsg = 0;

  bookmarked = false;
  bookNextUrl = null;
  bookCurrentPage = 1;
  openMessage(id,index)
  {
    this.loading=true;
    this.http.get(`https://ralpdexterbongato.herokuapp.com/api/message/`+id).subscribe(
      data=>{
        console.log(data);
        this.handleCurrentOpen(data);
        if(index!=null)
        {
          this.handleMarkAsOpen(index);
        }
        this.loading=false;
      },
      error=>{
        console.log(error);
        this.loading=false;
      }
    )
  }
  handleMarkAsOpen(index)
  {
    if(this.inboxList[index].read==null)
    {
      this.inboxList[index].read = 0;
      this.totalUnread = Number(this.totalUnread) - 1;
      this.totalRead = Number(this.totalRead) + 1;
    }
    this.openedIndex = index;
  }
  handleCurrentOpen(data)
  {
    this.currentlyOpen = data;
    if(data[0].receiver.length > 0)
    {
      this.bookmarked = true;
    }else
    {
      this.bookmarked = false;
    }
  }

  closeMessage()
  {
    this.currentlyOpen =[];
    this.openedIndex = null;
  }
  getMessages(page)
  {
    this.loading=true;
    this.http.get(`https://ralpdexterbongato.herokuapp.com/api/message?page=`+page+`&type=`+this.getType).subscribe(
      data=>{
        console.log(data);
        this.inboxHandler(data);
        this.loading=false;
      },
      err=>{
        console.log(err);
        this.loading=false;
      }
    )
  }
  inboxHandler(data)
  {
    this.currentpage = data.current_page;
    this.nextPageUrl = data.next_page_url;
    if(this.currentpage != 1)
    {
      for (let i = 0; i < data.data.length; i++) {
        this.inboxList.push(data.data[i]);
      }
    }else
    {
      this.inboxList = data.data;
    }
  }

  logout()
  {
    this.loading=true;
    this.http.post(`https://ralpdexterbongato.herokuapp.com/api/logout`,{}).subscribe(
      data=>{
        console.log(data);
        this.token.remove();
        this.router.navigate(['admin-only']);
        this.loading=false;
      },
      error=>{
        console.log(error);
        this.token.remove();
        this.router.navigate(['admin-only']);
        this.loading=false;
      }
    );
  }
  addToBookMarks(id)
  {
    this.loading=true;
    var vm=this;
    this.http.post(`https://ralpdexterbongato.herokuapp.com/api/bookmark`,{message_id:id}).subscribe(
      data=>
      {
        console.log(data);
        vm.toaster.Success("added to bookmarks list","Successfully");
        vm.PushToBookMarkList(this.openedIndex);
        vm.bookmarked=true;
        this.loading=false;
      },
      error=>
      {
        console.log(error);
        if(error.error.errors.message_id!=null)
        {
          vm.toaster.Error("Already added to bookmarks","Oops!");
        }
        this.loading=false;
      }
    )
  }
  PushToBookMarkList(index)
  {
    this.displayBookMarks(1);
    this.totalBookmark = Number(this.totalBookmark) + 1;
  }
  displayBookMarks(page)
  {
    this.loading=true;
    this.http.get(`https://ralpdexterbongato.herokuapp.com/api/bookmark?page=`+page).subscribe(
      data=>
      {
        console.log(data);
        this.handleBookMarks(data);
        this.loading=false;
      },
      error=>
      {
        console.log(error);
        this.loading=false;
      }
    )
  }
  handleBookMarks(data)
  {
    this.bookCurrentPage = data.current_page;
    this.bookNextUrl = data.next_page_url;
    if(this.bookCurrentPage != 1)
    {
      for (let i = 0; i < data.data.length; i++)
      {
          this.bookMarkList.push(data.data[i]);
      }
    }else
    {
      this.bookMarkList= data.data;
    }
  }
  getStatistics()
  {
    this.http.get(`https://ralpdexterbongato.herokuapp.com/api/statistics`).subscribe(
      data=>
      {
        console.log(data);
        this.handleStatisticsResult(data);
      },
      error=>
      {
        console.log(error);
      }
    )
  }
  handleStatisticsResult(data)
  {
    this.totalBookmark=data.totalbookmark;
    this.totalUnread =data.unread;
    this.totalRead = data.read;
    this.totalMsg = data.message;
  }
  removeFromBookMarks(id)
  {
    this.loading=true;
    this.http.delete(`https://ralpdexterbongato.herokuapp.com/api/bookmark/`+id).subscribe(
      data=>{
        console.log(data);
        this.bookmarked=false;
        this.toaster.Success("removed from bookmarks list","Successfully");
        this.handleRemoveFromCurrentList();
        this.loading=false;
      },
      error=>{
        console.log(error);
        this.loading=false;
      }
    )
  }
  handleRemoveFromCurrentList()
  {
    this.displayBookMarks(1);
    this.totalBookmark = Number(this.totalBookmark) - 1;
  }
}
