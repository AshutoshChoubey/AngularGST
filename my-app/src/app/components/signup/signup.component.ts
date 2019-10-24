import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { JarwisService } from './../../Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error = [];
  public submitClicked=0;

  constructor( private Jarwis: JarwisService,
    private Token:TokenService,
    private router:Router,
    private auth :AuthService,
     ) { } 
  public form = {
    name:null,
    email: null,
    password: null,
    password_confirmation:null
  };
  public handleError(error){
    this.submitClicked=0;
    this.error = error.error.errors;
  }
  onSubmit() {
    this.submitClicked=1;
    this.Jarwis.signup(this.form).subscribe(
      data=>this.handleResponse(data),
      error =>this.handleError(error)
      );
 }
 handleResponse(data)
  {
    this.submitClicked=0;
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/dashboard');
     this.auth.changeAuthStatus(true);
     this.auth.setUserDetail(data);
  }

  ngOnInit() {  
  }

}
