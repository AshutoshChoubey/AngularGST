import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private Token : TokenService) { }
  private logedIn=new BehaviorSubject <boolean>(this.Token.logedIn());
  authStatus=this.logedIn.asObservable();
  userId= localStorage.getItem('userId');
  userName=localStorage.getItem('userName');
  userEmail=localStorage.getItem('userEmail');
  changeAuthStatus(value:boolean)
  {
    this.logedIn.next(value);
  }
  public setUserDetail(data)
  {
    localStorage.setItem('userId',data.id);
    localStorage.setItem('userName',data.name);
    localStorage.setItem('userEmail',data.email);
  }
  public removeUserDetail()
  {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }
}
