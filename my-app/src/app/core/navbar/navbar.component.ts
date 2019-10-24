import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( 
    private auth :AuthService,
    private router : Router,
    private token :TokenService
   ) {
   }
   public loggedIn :boolean;
  ngOnInit() {
    this.auth.authStatus.subscribe(value=>this.loggedIn=value);
    // console.log(this.loggedIn)
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
