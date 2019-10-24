import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseurl="http://localhost/bcm/backend/public/api";
  // private baseurl="http://phoenixhub.co.in/bcm/backend/public/api";
 getProduct()
 {
   return this.http.get(`${this.baseurl}/products`);
 }
 getProductById(id)
 {
   return this.http.get(`${this.baseurl}/products/${id}`);
 }
 save(data) 
 {
   return this.http.post(`${this.baseurl}/products`,data);
 }
 update(data,id) 
 {
   return this.http.put(`${this.baseurl}/products/${id}`,data);
 }
 nextProductId()
 {
  return this.http.get(`${this.baseurl}/lastInertedProduct`);
 }
 productSearch(data)
 {
 	return this.http.post(`${this.baseurl}/productSearch`,data);
 }
 reportByDepartment(data)
 {
 	return this.http.post(`${this.baseurl}/reportByDepartment`,data);
 }
 saveValuationReport(data)
 {
 	return this.http.post(`${this.baseurl}/saveReport`,data);
 }
 savevaluations()
 {
 	 return this.http.get(`${this.baseurl}/savevaluations`);
 }
 getViewSavedStock(id)
 {
 	 return this.http.get(`${this.baseurl}/getViewSavedStock/${id}`);
 }
 getSavedProduct(id)
 {
 	 return this.http.get(`${this.baseurl}/getSavedCurrentStock/${id}`);
 }
 currentProductStockSearch(data)
 {
 	return this.http.post(`${this.baseurl}/currentProductStockSearch`,data);
 }
}
