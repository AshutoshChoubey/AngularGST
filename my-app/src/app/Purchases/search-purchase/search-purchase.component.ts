import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { IndentService } from './../../Services/indent.service';
import { DatePipe } from '@angular/common';
interface Purchase{
	pur_product_code:string,
	pur_product_name:string,
	pur_pro_id:number,
	pur_dep_name:string,
	pur_dep_code:number,
	pur_pro_specif:string,
	id:number,
	pur_pro_type:string,
	pur_pro_place:string,
	pur_quanity:number,
	pur_indent_detail_id:number,
	pur_indent_id:number,
	pur_indent_discription:string,
	pur_pro_opening:number,
	pur_pro_closing:number,
	pur_pro_price:number,
	pur_pro_quanity:number,
	pur_indent_month:string,
	pur_date:Date
  };

	

@Component({
  selector: 'app-search-purchase',
  templateUrl: './search-purchase.component.html',
  styleUrls: ['./search-purchase.component.css']
})
export class SearchPurchaseComponent implements OnInit {

  constructor(private excelService:ExcelService,private indentService:IndentService,public datepipe: DatePipe) { }

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
    componentTitle="Purchase List";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Purchase>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['id',                      
'pur_product_name',                    
'pur_pro_id',                 
'pur_dep_name',                    
'pur_dep_code',                    
'pur_pro_specif',                    
'pur_product_code',                       
'pur_pro_type',                      
'pur_pro_place',                     
'pur_quanity',                     
'pur_indent_detail_id',                    
'pur_indent_id',                      
'pur_indent_discription',
'pur_pro_opening',                    
'pur_pro_closing',                     
'pur_pro_price',                       
'pur_pro_quanity',                      
'pur_indent_month',                    
'pur_date'                     ];
  public indentListFromDatabase:any=[];
  ngOnInit() {
  	this.indentService.purchasesList().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	
  }
  exportAsXLSX():void {
    let str = JSON.stringify(this.indentListFromDatabase);
    str = str.replace(/\"opening_stock\":/g, "\"Current Price\":");
    str = str.replace(/\"closing_stok\":/g, "\"Previous/Last Price\":");
    this.indentListFromDatabase = JSON.parse(str);
    this.excelService.exportAsExcelFile(this.indentListFromDatabase, 'Purchase_Report');
  }
  public handleResponse(data)
  {
    this.indentListFromDatabase=data;
    this.dataSource.data= data as Purchase[];
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
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
