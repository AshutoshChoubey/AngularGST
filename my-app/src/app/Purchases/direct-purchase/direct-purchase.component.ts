import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { ProductService } from 'src/app/Services/product.service';
 import Swal from 'sweetalert2';
declare let swal: any;

@Component({
  selector: 'app-direct-purchase',
  templateUrl: './direct-purchase.component.html',
  styleUrls: ['./direct-purchase.component.css']
})
export class DirectPurchaseComponent implements OnInit {

public brads = [
    {
      name: 'Add Product',
      url: '/addProduct'
    },
     {
      url: '/searchProduct',
      name: 'Search Product'
    },
    {
      url: '/addDepartment',
      name: 'Add Department'
    },
    {
      url: '/indent',
      name: 'Indent '
    },
    {
      url: '/indentList',
      name: 'Indent List'
    }
    ];
  constructor(private departmentService: DepartmentServiceService, private productService: ProductService) { }
  public form = {
    product_code:null,
    product_name: null,
    product_department_Name:null,
    product_department: null,
    product_specification: null,
    product_type: null,
    product_unit: null,
    product_hsn: null,
    product_igst: 0,
    product_cgst: 0,
    product_sgst: 0,
    product_gst: 0,
    place: null,
    product_color:null,
    product_specimen:null,
    product_make:null
  };
  submitClicked = 0;
  public departmentLists = [];
  public productLists:any=[];
  public productDetailForProductId:any;
  public productListFiltered:any;
  public productDep:any;


  ngOnInit() {
  	this.submitClicked = 0;
    this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
     this.productService.getProduct().subscribe(
      data => this.setproductList(data)
      );
       this.submitClicked = 0;

  }
  setproductList(data)
  {
    this.productLists=data
  }
   public onProductCodeChange(id,i)
  {
    this.productDetailForProductId =  this.productLists.filter(x => x.id == id);
  }
  public onDepartmentChange(indent_department)
  {
     this.productListFiltered =  this.productLists.filter(x => x.product_department == indent_department);
      this.productDep =  this.departmentLists.filter(x => x.id == indent_department);
     
  }
   public handleResponse(data)
  {
    this.departmentLists=data;
  }
  public handleError(error)
  {
    // Swal.fire('Something Went Worng', 'Department Data not fetched correctly !! .. Please refresh or  Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  	Swal.fire('Something Went Worng', 'Department Data not fetched correctly !! .. Please  Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  	console.log(error);
  }
  refresh()
  {
  	console.log('works');
  }
  onSubmit()
  {
    
  }
}
