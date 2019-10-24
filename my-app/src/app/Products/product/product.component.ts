import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { ProductService } from 'src/app/Services/product.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Product } from './productInerfac';
import { Router }   from '@angular/router';
import { Subject } from 'rxjs';
import {MatIconModule} from '@angular/material/icon'; 
import Swal from 'sweetalert2';
declare let swal: any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy,AfterViewInit  {
  error: any;
  @ViewChild('dataTable') table;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['id','product_department_Name','product_code','product_name','place','product_gst','product_hsn','product_igst','product_sgst','product_cgst','product_specification','product_type','product_unit','created_at'];
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  getNextProductCode: any;
 
  constructor(private departmentService: DepartmentServiceService, private productService: ProductService,private router:Router) { }
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
    }
    ];

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
  exampleData = [];
  submitResponse = [];
  submitError = [];
  handleProductResponse=[];
  public productDep;


  ngOnInit() {
    this.submitClicked = 0;
    this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
      this.productService.getProduct().subscribe(
        data =>  this.dataSource.data = data as Product[],
        );
        this.productService.nextProductId().subscribe(
          data =>  this.getNextProductId(data)  
          );
      //  console.log(this.dataSource);
  }
  getNextProductId(data){
    this.getNextProductCode=data;
    // console.log(this.getNextProductCode);
  }
  
  ngOnDestroy(): void {
   
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  onSubmit() {
    this.form.product_code=this.productDep[0].department.slice(0, 3).toUpperCase()+'/'+this.form.product_name.slice(0, 3).toUpperCase()+'/'+this.getNextProductCode;
    
     this.form.product_department_Name=this.productDep[0].department;
     this.form.product_gst=this.form.product_sgst+this.form.product_cgst+this.form.product_igst;
      this.submitClicked = 1;
      this.productService.save(this.form).subscribe(
      data => this.handleSubmitResponse(data),
      error => this.handleSubmitError(error)
      );
      this.productService.nextProductId().subscribe(
          data =>  this.getNextProductId(data)  
          );
      
      this.form.product_code=this.productDep[0].department.slice(0, 3).toUpperCase()+'/'+this.form.product_name.slice(0, 3).toUpperCase()+'/'+this.getNextProductCode;
    
   
  }
  public ProductResponse(data)
  {
    this.handleProductResponse=data;
    // console.log(data);
    
  }
  public handleSubmitResponse(data) {
    this.submitClicked = 0;
    this.submitResponse = data;
     this.form.product_code=null;
    this.form.product_name= null;
    this.form.product_department_Name=null;
    this.form.product_department= null;
    this.form.product_specification= null;
    this.form.product_type= null;
    this.form.product_unit= null;
    this.form.product_hsn= null;
    this.form.product_igst= 0;
    this.form.product_cgst= 0;
    this.form.product_sgst= 0;
    this.form.product_gst= 0;
    this.form.place= null;
    this.form.product_color=null;
    this.form.product_specimen=null;
    this.form.product_make=null;
    // this.router.navigate(['/view-product',data]);
    // this.router.navigate(['/view-product',data]);
     // Swal.fire('Info', 'Successful', 'info');
     Swal.fire('Info', 'Successful', 'info');
  }
  public handleSubmitError(error) {
    this.submitClicked = 0;
    this.submitError = error;
    Swal.fire('Something Went Worng', 'Sometimes You are Not Lucky :)', 'error');
    
  }
  public handleResponse(data) {
    this.submitClicked = 0;
    this.departmentLists = data;
  }
  public handleError(error) {
    this.submitClicked = 0;
    this.error = error.statusText + ' For Department List';
  }
  public onProductCodeChange(product_department)
  {
    
     this.productDep =  this.departmentLists.filter(x => x.id == product_department);
    this.form.product_code=this.productDep[0].department.slice(0, 3).toUpperCase()+'/'+this.form.product_name.slice(0, 3).toUpperCase()+'/'+this.getNextProductCode;
    
     // console.log(this.productDep[0].department);
  }
   public onProductChange()
  { 
    if(this.productDep)
    {
     this.form.product_code=this.productDep[0].department.slice(0, 3).toUpperCase()+'/'+this.form.product_name.slice(0, 3).toUpperCase()+'/'+this.getNextProductCode; 
    }
    
  }
  

}
