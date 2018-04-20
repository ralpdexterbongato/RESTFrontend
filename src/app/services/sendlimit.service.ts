import { Injectable } from '@angular/core';

@Injectable()
export class SendLimitService {

  constructor() { }

  CanSend()
  {
    var currentCount =this.getCount();
    console.log(currentCount);
    if(Number(currentCount)>2)
    {
      return false;
    }else
    {
      return true;
    }
  }
  incrementCount()
  {
    var currentnum =this.getCount();
    if(currentnum==null)
    {
      this.setCount(1);
    }else
    {
      var newnum = Number(currentnum) + 1;
      this.setCount(newnum);
    }
  }
  setCount(count)
  {
    localStorage.setItem('counter',count);
  }
  getCount()
  {
    return localStorage.getItem('counter');
  }
}
