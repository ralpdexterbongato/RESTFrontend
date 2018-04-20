import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  private iss = {
    login:'http://ralpdexterbongato.herokuapp.com/api/login',
    logout:'http://ralpdexterbongato.herokuapp.com/api/logout',

  }

  constructor() { }

  handle(token)
  {
    this.set(token);
    console.log(this.loggedIn());
  }
  set(token)
  {
    localStorage.setItem('token',token)
  }
  get()
  {
    var theToken =  localStorage.getItem('token');
    console.log(theToken);
    return theToken;
  }
  remove()
  {
    return localStorage.removeItem('token');
  }
  isValid()
  {
    let token = this.get();
    if(token)
    {
      let payload = this.getPayLoad(token);
      console.log(payload);
      if(payload)
      {
          return Object.values(this.iss).indexOf(payload.iss) > -1 ? true:false;
      }
      return false;
    }
  }
  getPayLoad(token)
  {
    let payload = token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload)
  {
    return JSON.parse(atob(payload));
  }

  loggedIn()
  {
    return this.isValid();
  }
}
