import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   constructor( 
    private auth :AuthService,
    private router : Router,
    private token :TokenService
   ) {
   }
   public loggedIn :boolean;
  ngOnInit() {
    this.auth.authStatus.subscribe(value=>this.loggedIn=value);
  }
  logout (event:MouseEvent)
  {
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.token.remove();
    this.auth.removeUserDetail();
  }

}
