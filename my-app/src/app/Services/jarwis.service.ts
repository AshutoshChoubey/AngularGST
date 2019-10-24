import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetUrlService } from './set-url.service';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http:HttpClient,private setUrl:SetUrlService) { }
  private baseurl=this.setUrl.url;
  // private baseurl="http://phoenixhub.co.in/bcm/backend/public/api";
  signup(data)
  {
    return this.http.post(`${this.baseurl}/signup`,data)
  }
  login(data)
  {
    return this.http.post(`${this.baseurl}/login`,data)
  }
}
