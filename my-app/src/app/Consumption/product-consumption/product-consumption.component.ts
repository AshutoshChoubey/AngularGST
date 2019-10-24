import { Component, OnInit } from '@angular/core';
import { IndentService } from './../../Services/indent.service';
import { DatePipe } from '@angular/common';
import { RequisitionService } from './../../Services/requisition.service';
import { DepartmentServiceService } from './../../Services/department-service.service';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-product-consumption',
  templateUrl: './product-consumption.component.html',
  styleUrls: ['./product-consumption.component.css']
})
export class ProductConsumptionComponent implements OnInit {

  constructor(private indentService:IndentService,private datepipe:DatePipe,private requisitionService:RequisitionService,private departmentService:DepartmentServiceService) { }
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
    componentTitle="Product Consumption Report";
    public exporterButton:number;
    public productData:any;
    public grandtopalWithTax:number;
    public Total:any;

  ngOnInit() {
    this.Total=0;
     this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponseForDepartment(data),
      error => this.handleErrorFordepartment(error)
      );
   this.requisitionService.userProductList().subscribe(
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
  public handleResponse(data) 
  {
    this.productData=data;
    // console.log(this.productData);
    for(let data of this.productData){
        this.Total+=data.use_quanity*(data.use_pro_price+(data.use_pro_price*data.product_gst)/100);
      }
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
    //      $('#example').DataTable( {
    //       dom:'Bfrtip',
    //   buttons: [ 'copy', 'excel', 'pdf','colvis' ]
    // } );
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Consumption Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Consumption Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Consumption Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Consumption Report',orientation: 'landscape',pageSize:'A3'},
        ]
    } );

      });
  }
    public  clicked:any;
  public searchFunctionality={
      fromDate:null,
      todate:null,
      productCode:null,
       departmentId:null
    };

  public Search()
  {
    this.clicked=1;
     this.requisitionService.productConsumedData(this.searchFunctionality).subscribe(
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
      this.Total+=parseFloat(data.use_quanity)*(parseFloat(data.use_pro_price)+(parseFloat(data.use_pro_price)*parseFloat(data.product_gst))/100);
      }
    Swal.fire('Good','Data fetched !! now you can appliy data exporter functionality by clicking on button for lattest filterd data', 'success');
  }
  public searchedProductError(error)
  {
    this.clicked=0;
      Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }

}
