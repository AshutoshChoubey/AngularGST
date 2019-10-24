import { Component, OnInit } from '@angular/core';
// import { SupplierService } from './../../SupplierService/SupplierService';
import { SupplierService } from './../../Services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {

  constructor(private supplierService:SupplierService) { }
  public componentTitle="Supplier Add"
  public brads = [
    {
      url: "/addSupplier",
      name: "Add Supplier" 
    },
      {
      url: "/searchSupplier",
      name: "Supplier List"
    }
    ]; 
  public form = { 
    supplier_name:null,
    mob_num:null,
    address:null,
    email:null,
    gstin:null,
  };

  public submitClicked=0;
  public messageAfterAdd:any=[];
  public errorAfterAdd:any=[];
  ngOnInit() {
  }
  onSubmit() {
    this.submitClicked = 1;
    this.supplierService.save(this.form).subscribe(
    data => this.handleSubmitResponse(data),
    error => this.handleSubmitError(error)
    );
}
public handleSubmitResponse(data) {
  this.submitClicked = 0;
  this.messageAfterAdd = data;
}
public handleSubmitError(error) {
  this.submitClicked = 0;
  this.errorAfterAdd = error;
}

}
