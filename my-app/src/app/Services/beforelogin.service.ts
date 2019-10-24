import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeloginService implements CanActivate{
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | 
  Observable<boolean> | Promise<boolean>{
    return !this.token.logedIn();
  }


  constructor(private token:TokenService) { }
}
