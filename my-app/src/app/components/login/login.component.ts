import { Component, OnInit } from '@angular/core';
import { JarwisService } from './../../Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  navBarHeader = 'Login';
  show = false;
  error = null;
  submitClicked : number =0;
  // constructor( private http: HttpClient) {
  //  }
   constructor( private Jarwis:JarwisService,private Token:TokenService, private router : Router,private auth :AuthService, ) {
  }

  public form = {
    email: null,
    password: null
  };
 
  public handleError(error){
    // console.log(error)
    this.submitClicked=0;
    this.error = error.error.error;
  }

  ngOnInit() {
  }
  onSubmit() {
      this.submitClicked=1;
      this.Jarwis.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error =>this.handleError(error)
      );
  }
  handleResponse(data)
  {
    this.submitClicked=0;
    // console.log(this.submitClicked);

    this.auth.setUserDetail(data);
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/dashboard');
      // console.log(data);
    this.auth.changeAuthStatus(true);
  }
}
