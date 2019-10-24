import { Component, OnInit } from '@angular/core';
import { IndentService } from './../../Services/indent.service';
import { DatePipe } from '@angular/common';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {

  constructor(private indentService:IndentService,public datepipe: DatePipe,private departmentService:DepartmentServiceService,private supplierService:SupplierService) { }
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
    componentTitle="Product Purchase Report";
    public exporterButton:number;
    public productData:any;
    public grandtopalWithTax:number;
    public supplierListFromDatabase:any;

  ngOnInit() {
    // this.Total=0;
     this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponseForDepartment(data),
      error => this.handleErrorFordepartment(error)
      );
   this.indentService.purchasesList().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
      this.exporterButton=0;
      this.clicked=0;

  this.supplierService.get().subscribe(
      data=>this.handleSupplierResponse(data)
      );
  }
  handleSupplierResponse(data)
  {
    this.supplierListFromDatabase=data;
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
  public Total:number;
  public handleResponse(data) 
  {
    this.productData=data;
this.Total=0;
    for(let data of this.productData){
        this.Total+=parseFloat(data.pur_quanity)*parseFloat(data.pur_pro_opening);
      }
      // console.log(this.Total);
    // console.log(this.productData);
    if(this.productData[0].id!=null)
     {
       this.exporterButton=1;
     }
  }
  public handleError(error)
  {
    console.log(error);
  }
  public exportButton()
  {
    this.exporterButton=0;
     $(function(){
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Purchase Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Purchase Report',orientation: 'landscape',pageSize:'A3'}
        ]
    } );

      });
  }

  public  clicked:any;
  public searchFunctionality={
      fromDate:null,
      todate:null,
      fromCreatedDate:null,
      toCreatedDate:null,
      productCode:null,
      departmentId:null,
      purchaseInvoice:null,
      supplierId:null,
      indent:null
    };

  public Search()
  {
    this.clicked=1;
     this.indentService.productPurchaseData(this.searchFunctionality).subscribe(
      data => this.searchedProduct(data),
      error => this.searchedProductError(error)
      );

    //console.log(this.searchFunctionality);
  }
  public searchedProduct(data)
  {
     this.clicked=0;
    this.productData=data;
     this.Total=0;
    for(let data of this.productData){
         this.Total+=parseFloat(data.pur_quanity)*(parseFloat(data.pur_pro_opening)+(parseFloat(data.pur_pro_opening)*parseFloat(data.product_gst))/100)
      }
    Swal.fire('Good','Data fetched !! now you can appliy data exporter functionality by clicking on button for lattest filterd data', 'success');
  }
  public searchedProductError(error)
  {
    this.clicked=0;
      Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }

}
 