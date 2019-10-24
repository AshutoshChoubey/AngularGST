import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetUrlService } from './set-url.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  constructor(private http:HttpClient,private setUrl:SetUrlService) { }
  private baseurl=this.setUrl.url;
  // private baseurl="http://phoenixhub.co.in/bcm/backend/public/api"; 
  save(data)
  {
    return this.http.post(`${this.baseurl}/requisitions`,data)
  }
  use(data)
  {
    return this.http.post(`${this.baseurl}/useStock`,data);
  }
   getRequisition()
  {
    return this.http.get(`${this.baseurl}/requisitions`)
  }
  requisitionSave(requisitinDetail)
  {
  	return this.http.post(`${this.baseurl}/requisitionSave`,requisitinDetail)
  }
  getRequisitionDetail(data)
  {
     return this.http.get(`${this.baseurl}/getRequisitions/${data}`);
  }
  getRequisitionReport(data)
  {
     return this.http.get(`${this.baseurl}/requisitionDetailsReport/${data}`);
  }
  userProductList()
  {
    return this.http.get(`${this.baseurl}/getproductuses`)
  }
  stockValuationReport()
  {
    
     return this.http.get(`${this.baseurl}/stockValuationReport`)
  }
  productConsumedData(data)
  {
    return this.http.post(`${this.baseurl}/productConsumedData`,data)
  }
  public stockValuationSearchedReport(data)
  {
    return this.http.post(`${this.baseurl}/stockValuationSearchedReport`,data);
  }
  requisitiondelete(data)
  {
     return this.http.delete(`${this.baseurl}/requisitions/${data}`);
  }
  deleteProductRequisitionDetails(id)
  {
     return this.http.delete(`${this.baseurl}/requisitiondetails/${id}`);
  }
  updateRequisitionProductDetail(data,id)
  {
     return this.http.put(`${this.baseurl}/requisitiondetails/${id}`,data);
  }
  getRequisitionById(id)
  {
     return this.http.get(`${this.baseurl}/requisitions/${id}`);
  }
  updateRequisition(id,data)
  {
      return this.http.put(`${this.baseurl}/requisitions/${id}`,data);
  }
  requisitionSaveSearchable(requisitinDetail)
  {
    return this.http.post(`${this.baseurl}/requisitionSaveSearchable`,requisitinDetail)
  }
  
}
 