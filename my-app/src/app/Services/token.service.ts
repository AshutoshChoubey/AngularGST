import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  // private iss={
  //   login :"http://phoenixhub.co.in/bcm/backend/public/api/login",
  //   signup :"http://phoenixhub.co.in/bcm/backend/public/api/signup"
  // }
  private iss={
    login :"http://localhost/bcm/backend/public/api/login",
    signup :"http://localhost/bcm/backend/public/api/signup"
  }
  handle(token)
  {
    this.set(token);
    //  console.log(this.payload(token));
  }
  set(token)
  {
    localStorage.setItem('token',token);
  }
  get()
  {
   return localStorage.getItem('token');
  }
  remove()
  {
    localStorage.removeItem('token');
  }
  isvalid()
  {
    const token=this.get();
    if(token){
      const payload=this.payload(token);
      if(payload)
      {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;


  }
  payload(token)
  {
   const payload= token.split('.')[1];
    return this.decodePayload(payload);
  }
  decodePayload(payload)
  {
    return JSON.parse(atob(payload));
  }
  logedIn()
  {
    return this.isvalid();
  }
}
