import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
declare const $;
@Component({
  selector: 'app-product-availibility',
  templateUrl: './product-availibility.component.html',
  styleUrls: ['./product-availibility.component.css']
})
export class ProductAvailibilityComponent implements OnInit {

  constructor(private productService:ProductService) { }
  
  public brads = [{
      name: 'Add Product',
      url: '/addProduct'
    },
    {
      name: 'Dashboard',
      url: '/dashboard'
    },
     {
      url: '/searchProduct',
      name: 'Search Product'
    },
    {
      url: '/searchPurchase',
      name: 'Search Purchase'
    },
    {
      url: '/addDepartment',
      name: 'Add Department'
    },
     {
      url: '/indent',
      name: 'Indent'
    },
    {
      url: '/indentList',
      name: 'Indent List'
    },
    {
      url: '/requisition',
      name: 'Requisition'
    },
    {
      url: '/requisitionList',
      name: 'Requisition List'
    },
    {
      url: '/producUseReport',
      name: 'Purchase Report'
    },
    {
       url: '/consumptionReport',
      name: 'Consumption Report'
    },
    {
      url: '/refresh',
      name: 'Refresh'
    }

    ];
    componentTitle="Product Availability Report";
    public exporterButton:number;
    public productData:any;

  ngOnInit() {
  	this.productService.getProduct().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
      this.exporterButton=0;
  }
  public handleResponse(data) 
  {
    this.productData=data;
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
	  //   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
	  // } );
     $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Availability Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Availability Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Availability Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Availability Report',orientation: 'landscape'}
        ]
    } );
	    });
	}

}
