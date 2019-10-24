import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AfterloginService implements CanActivate {
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("/var/www/html/github/LaravelAngular/view/node_modules/rxjs/internal/Observable").Observable<boolean> | Promise<...> {
  //   throw new Error("Method not implemented.");
  // }
  
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | 
  Observable<boolean> | Promise<boolean>{
    return this.Token.logedIn();
  }

  constructor(private Token:TokenService) { }
}
