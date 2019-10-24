import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetUrlService } from './set-url.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {


 constructor(private http:HttpClient,private setUrl:SetUrlService) { }
  private baseurl=this.setUrl.url;
    // private baseurl="http://phoenixhub.co.in/bcm/backend/public/api";
   getProductDepartment()
  {
    return this.http.get(`${this.baseurl}/departments`)
  }
  save(data) 
  {
    return this.http.post(`${this.baseurl}/departments`,data)
  }
   update(data,id) 
  {
    return this.http.put(`${this.baseurl}/departments/${id}`,data)
  }
   getProductUnit(data) 
  {
    return this.http.post(`${this.baseurl}/getProductUnit`,data)
  }
}
