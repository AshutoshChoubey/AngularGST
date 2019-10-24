import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { ProductService } from 'src/app/Services/product.service';
import { DatePipe } from '@angular/common';
declare const $;
 
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
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {

  constructor(private excelService:ExcelService,private productService:ProductService,public datepipe: DatePipe) { }

   public brads = [{
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
    componentTitle="Price Report";
    public exporterButton:any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['id','product_department_Name','product_code','product_name',
  // 'place',
  'available_stock',
  // ,'stock_in','stock_out',
  'opening_stock','closing_stok','product_hsn',
  // 'product_igst',
  'product_cgst','product_sgst','product_gst',
  'product_tax_price','Total_price_with_tax','product_Grand_total_price'
  // 'product_specification','product_specimen','product_make','product_type','product_unit','created_at','update'
];
 
  public indentListFromDatabase:any=[];
  ngOnInit() {
  	this.productService.getProduct().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
    this.exporterButton=0;
  	
  }
  exportAsXLSX():void {
    let str = JSON.stringify(this.indentListFromDatabase);
    this.indentListFromDatabase.product_tax_price= ((this.indentListFromDatabase.opening_stock)*(this.indentListFromDatabase.product_gst)/100);
    this.indentListFromDatabase.product_tax_price=(this.indentListFromDatabase.opening_stock)+((this.indentListFromDatabase.opening_stock)*(this.indentListFromDatabase.product_gst)/100);
    this.indentListFromDatabase.product_tax_price= ((this.indentListFromDatabase.opening_stock)+((this.indentListFromDatabase.opening_stock)*(this.indentListFromDatabase.product_gst)/100))*this.indentListFromDatabase.available_stock;
    str = str.replace(/\"opening_stock\":/g, "\"Current Price\":");
    str = str.replace(/\"closing_stok\":/g, "\"Previous/Last Price\":");
    this.indentListFromDatabase = JSON.parse(str);
  
    // console.log(this.indentListFromDatabase);
    // this.indentListFromDatabase.
    this.excelService.exportAsExcelFile(this.indentListFromDatabase, 'Product_Uses');
  }
  public handleResponse(data) 
  {
    this.indentListFromDatabase=data;
    // console.log(this.indentListFromDatabase);
    this.dataSource.data= data as Product[];
    if(this.indentListFromDatabase[0].id!=null)
     {
       this.exporterButton=1;
        // $('#example').DataTable();
     }
     // this.indentListFromDatabase=this.dataSource.data;
  }
  public handleError(error)
  {
  	console.log(error);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    // console.log(this.dataSource);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // console.log(this.dataSource);
  }
  exportButton()
    {
      this.exporterButton=0;
       $(function(){
      //      $('#example').DataTable( {
      //       dom:'Bfrtip',
      //   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
      // } );
       $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Price Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Price Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Price Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Price Report',orientation: 'landscape'}
        ]
    } );
       
        });
    }


}
