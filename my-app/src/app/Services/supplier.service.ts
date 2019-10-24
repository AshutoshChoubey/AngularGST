import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetUrlService } from './set-url.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 constructor(private http:HttpClient,private setUrl:SetUrlService) { }
  private baseurl=this.setUrl.url;
  // private baseurl="http://localhost/bcm/backend/public/api";
  save(data)
  {
    return this.http.post(`${this.baseurl}/suppliers`,data);
  }
  get()
  {
    return this.http.get(`${this.baseurl}/suppliers`)
  }
  update(data,id) 
  {
    return this.http.put(`${this.baseurl}/suppliers/${id}`,data)
  }

} 

