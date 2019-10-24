import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { ProductService } from 'src/app/Services/product.service';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';

export interface Product{
  created_at: Date,
  created_by: BigInteger,
  deleted_at: Date,
  id: number,
  product_cgst: number,
  product_code: string,
  place: number,
  product_department_Name: string,
  product_gst: number,
  product_hsn: string,
  product_igst: number,
  product_name: string,
  product_sgst: number,
  product_specification: string,
  product_type: string,
  product_unit: string,
  available_stock:number,
  stock_in:number,
  stock_out:number,
  opening_stock:number,
  closing_stok:number,
  status: boolean,
  product_make:string,
  product_specimen:string,
  updated_at: Date
  };
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(private productService:ProductService,private excelService:ExcelService,private departmentService:DepartmentServiceService) { }
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
  public componentTitle="Product Search";
  public productListFromDatabase:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['id','product_department_Name','product_code','product_name','place','available_stock','stock_in','stock_out','opening_stock','closing_stok','product_hsn','product_igst','product_cgst','product_sgst','product_gst','product_specification','product_specimen','product_make','product_type','product_unit','created_at','update'];
  public dataForUpdate:any=[];
  public messageAfterUpdate:any=[];
  public submitClicked=0;
  public errorAfterUpdate:any=[];
  public responseforProductDepartment:any=[];
  public errorforProductDepartment:any=[];

  ngOnInit() {
  	   this.productService.getProduct().subscribe(
      data=>this.handleResponse(data)
      );
    this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponseforProductDepartment(data),
      error => this.handleErrorforProductDepartment(error)
    );
  }

   exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.productListFromDatabase, 'Product');
  }
  
  public handleResponse(data)
  {
    this.productListFromDatabase=data;
    let str = JSON.stringify(this.productListFromDatabase);
    str = str.replace(/\"opening_stock\":/g, "\"Current Price\":");
    str = str.replace(/\"closing_stok\":/g, "\"Previous/Last Price\":");
    this.productListFromDatabase = JSON.parse(str);
    // console.log(this.productListFromDatabase)
//     this.productListFromDatabase.updated_at= this.productListFromDatabase._id;
// del object['updated_at']
//     this.productListFromDatabase
    this.dataSource.data= data as Product[];
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public redirectToUpdae(data)
  {
    this.dataForUpdate=data;
  }
  onSubmit() {
    this.submitClicked = 1;
    this.productService.update(this.dataForUpdate,this.dataForUpdate.id).subscribe(
    data => this.handleSubmitResponse(data),
    error => this.handleSubmitError(error)
    );

 }
 public handleResponseforProductDepartment(data)
 {
  this.responseforProductDepartment = data;
 }
 public handleErrorforProductDepartment(error)
 {
  this.errorforProductDepartment = error.statusText + ' For Department List';
 }
  public handleSubmitResponse(data) {
    this.submitClicked = 0;
    this.messageAfterUpdate = data;
    this.errorAfterUpdate=[];
  }
  public handleSubmitError(error) {
    this.submitClicked = 0;
    this.errorAfterUpdate = error;
  }
 
}
