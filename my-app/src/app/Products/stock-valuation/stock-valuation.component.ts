import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { RequisitionService } from './../../Services/requisition.service';
import { DatePipe } from '@angular/common';
import { DepartmentServiceService } from './../../Services/department-service.service';
import Swal from 'sweetalert2';
declare const $;
// import * as $ from "jquery"
// import "datatables.net";
// import "datatables-epresponsive";
// import "datatables.net-dt"; 
// import "./../../ourJs"; 
// declare var $:JQueryStatic;
// declare const $;

interface Purchase{
    add_stock: number,
    available_stock: number,
    closing_stok:number,
    consume_stock:number,
    created_at: Date,
    created_by: number,
    deleted_at: number,
    id:number,
    opening_stock: number,
    place:string,
    product_cgstnumber,
    product_code:string,
    product_color:string,
    product_department: string,
    product_department_Name: string,
    product_gst:  number,
    product_hsn:string,
    product_igst:  number,
    product_make: string,
    product_name:string,
    product_sgst: number,
    product_specification:string,
    product_specimen: string,
    product_type: string,
    product_unit:string,
    status: number,
    stock_in: number,
    stock_out: number
  };

	


@Component({
  selector: 'app-stock-valuation',
  templateUrl: './stock-valuation.component.html',
  styleUrls: ['./stock-valuation.component.css']
})
export class StockValuationComponent implements OnInit {

  constructor(private excelService:ExcelService,private requisitionService:RequisitionService,public datepipe: DatePipe,private departmentService:DepartmentServiceService) { }

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
    componentTitle="Stock Valuation Report";
public exporterButton:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Purchase>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = [
// 'stock_in',                                          
// 'stock_out'
// 'id',
// 'product_name',
// 'product_code', 
// 'product_department_Name', 
// 'add_stock', 
// 'consume_stock',                              
// 'available_stock',                                
// 'closing_stok',                                                                                                                                                                                 
// 'opening_stock', 
// 'use_date',                                      
// 'place',                                          
// 'product_cgst', 
// 'product_sgst',                                                                               
// 'product_color',                                         
// 'product_department',                                          
                                                                    
// 'product_hsn',                                           
// 'product_igst',                                            
// 'product_make',                                                                                         
// 'product_gst',
// 'product_tax_price',
// 'product_total_price',
//  'product_Grand_total_price'
// 'product_specification',                                           
// 'product_specimen',                                             
// 'product_type',                                            
// 'product_unit'                                                                                     
];
public fromDate1:any="Today's";
  public indentListFromDatabase:any=[];
  ngOnInit() {
    this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponseForDepartment(data),
      error => this.handleErrorFordepartment(error)
      );
  	this.requisitionService.stockValuationReport().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
 	this.exporterButton=0;
  this.clicked=0;
  }

  public departmentLists = [];
  handleResponseForDepartment(data)
  {
     this.departmentLists = data;
  }
  handleErrorFordepartment(data)
  {
     Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }

  AfterViewInit() {
    //     $('#default-datatable').DataTable();


    //    var table = $('#example').DataTable( {
    //     lengthChange: false,
    //     buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
    //   } );
 
    //  table.buttons().container()
    //     .appendTo( '#example_wrapper .col-md-6:eq(0)' );
    }
    exportButton()
    {
      this.exporterButton=0;
       $(function(){
           $('#example').DataTable( {
            dom:'Bfrtip',
        buttons: [ 'copy', 'excel', 'pdf','colvis' ]
      } );
        });
    }

  exportAsXLSX():void {
    let str = JSON.stringify(this.indentListFromDatabase);
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
    this.dataSource.data= data as Purchase[];
    // console.log(this.indentListFromDatabase);
     // this.indentListFromDatabase=this.dataSource.data;
     if(this.indentListFromDatabase[0].id!=null)
     {
       this.exporterButton=1;
      // setTimeout(function(){ 
      

        // functionForDataTable();
        // $('#example').DataTable();

    //    var dat: {
    //       lengthChange: false,
    //       buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
    //     }
    //   var table = $('#example').DataTable({
    //     lengthChange: false,
    //     buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
    //   });

    // table.buttons().container()
    //    .appendTo( '#example_wrapper .col-md-6:eq(0)' );
    // let exampleId: any = $('#example');
    // this.tableWidget = exampleId.DataTable({
    //   select: true
    // });

    //  $(document).ready(function() {
      //Default data table
     //   $('#default-datatable').DataTable();


      //  var table = exampleId.DataTable( {
      //   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
      // } );
     //    var table = exampleId.DataTable.buttons:'excel'
      
 
     // table.buttons().container()
     //    .appendTo( '#example_wrapper .col-md-6:eq(0)' );
      
      // } );
      // var table= exampleId.DataTable : {  buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ] };
      //  table.buttons().container()
      //   .appendTo( '#example_wrapper .col-md-6:eq(0)' );
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    
     // }, 3000);
      
    }
  }
  public handleError(error)
  {
  	console.log(error);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
   public  clicked:any;
  public searchFunctionality={
      fromDate:null,
      departmentId:null
    };

  public Search()
  {
    this.clicked=1;
     this.requisitionService.stockValuationSearchedReport(this.searchFunctionality).subscribe(
      data => this.searchedProduct(data),
      error => this.searchedProductError(error)
      );
     this.fromDate1=this.searchFunctionality.fromDate;

    //console.log(this.searchFunctionality);
  }
  public searchedProduct(data)
  {
     this.clicked=0;
    this.indentListFromDatabase=data;
    Swal.fire('Good','Data fetched !! now you can appliy data exporter functionality by clicking on button for lattest filterd data', 'success');
  }
  public searchedProductError(error)
  {
    this.clicked=0;
      Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }
  // public doFilter = (value: string) => {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  // }

}
