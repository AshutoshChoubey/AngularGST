import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetUrlService } from './set-url.service';

@Injectable({
  providedIn: 'root'
}) 
export class IndentService {

  constructor(private http:HttpClient,private setUrl:SetUrlService) { }
  private baseurl=this.setUrl.url;
  // private baseurl="http://phoenixhub.co.in/bcm/backend/public/api";
  save(data)
  {
    return this.http.post(`${this.baseurl}/indents`,data)
  }
   getIndent()
  {
    return this.http.get(`${this.baseurl}/indents`)
  }
  updateIndent(id,data)
  {
    return this.http.put(`${this.baseurl}/indents/${id}`,data)
  }
   getIndentWIthId(id)
  {
    return this.http.get(`${this.baseurl}/indents/${id}`)
  }
  
  indentSave(data,department,indentForMonth)
  {
  	return this.http.post(`${this.baseurl}/indentSave/${department}/${indentForMonth}`,data)
  }
  indentMake(data,department,indentForMonth)
  {
    return this.http.post(`${this.baseurl}/indentMake/${department}/${indentForMonth}`,data)
  }
  getIndentDetail(data)
  {
     return this.http.get(`${this.baseurl}/getIndentDetail/${data}`);
  }
  addStock(data)
  {
     return this.http.post(`${this.baseurl}/stockAdd`,data)
  }
  purchasesList()
  {
     return this.http.get(`${this.baseurl}/getpurhase`)
  }
  productPurchaseData(data)
  {
    return this.http.post(`${this.baseurl}/productPurchaseData`,data)
  }
  indentdelete(data)
  {
     return this.http.delete(`${this.baseurl}/indents/${data}`);
  }
  updateIndentProductDetail(data,id)
  {
     return this.http.put(`${this.baseurl}/indentdetails/${id}`,data);
  }
  deleteProductIndentDetails(id)
  {
     return this.http.delete(`${this.baseurl}/indentdetails/${id}`);
  }
  public getIndentDetailForPurhase(data)
  {
    return this.http.get(`${this.baseurl}/getIndentDetailForPurhase/${data}`);
  }
}
