import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { RequisitionService } from './../../Services/requisition.service';
import { DatePipe } from '@angular/common'
interface Purchase{
	use_product_code:string,
	use_product_name:string,
	use_pro_id:number,
	use_dep_name:string,
	use_dep_code:number,
	use_pro_specif:string,
	id:number,
	use_pro_type:string,
	use_pro_place:string,
	use_quanity:number,
	use_requisition_detail_id:number,
	use_requisition_id:number,
	use_requisition_discription:string,
	// use_pro_opening:number,
	// use_pro_closing:number,
	use_pro_price:number,
	use_pro_quanity:number,
	use_requisition_month:string,
	use_date:Date
  };

	

@Component({
  selector: 'app-product-use-search',
  templateUrl: './product-use-search.component.html',
  styleUrls: ['./product-use-search.component.css']
})
export class ProductUseSearchComponent implements OnInit {

  constructor(private excelService:ExcelService,private requisitionService:RequisitionService,public datepipe: DatePipe) { }

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
    componentTitle="Product Consume Report";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Purchase>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['id',                      
'use_product_name',                    
'use_pro_id',                 
'use_dep_name',                    
'use_dep_code',                    
'use_pro_specif',                    
'use_product_code',                       
'use_pro_type',                      
'use_pro_place',                     
'use_quanity',   
'use_pro_price',                   
'use_requisition_detail_id',                    
'use_requisition_id',                      
'use_requisition_discription',
// 'use_pro_opening',                    
// 'use_pro_closing',
'use_pro_quanity',                      
'use_requisition_month',                    
'use_date'                     ];
  public indentListFromDatabase:any=[];
  ngOnInit() {
  	this.requisitionService.userProductList().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.indentListFromDatabase, 'Product_Uses');
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
