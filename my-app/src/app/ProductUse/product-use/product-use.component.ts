import { Component, OnInit } from '@angular/core';
import { RequisitionService } from './../../Services/requisition.service';
// import { Router }   from '@angular/router';
import { ActivatedRoute }   from '@angular/router';
import Swal from 'sweetalert2';
declare let swal: any;
declare const $;

@Component({
  selector: 'app-product-use',
  templateUrl: './product-use.component.html',
  styleUrls: ['./product-use.component.css']
})

export class ProductUseComponent implements OnInit {

  constructor(private requisitionService:RequisitionService,private route:ActivatedRoute) { }
  public submited:any;
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
	    },
	     {
	      url: '/requisitionList',
	      name: 'Requisition List'
	    },
	     {
	      url: '/requisition',
	      name: 'Create Requisition'
	    }
	    ];
	    componentTitle="Consume Stock";
	    public data:any;
	    addstockerror:any;
	    addstockConfirmation:any;
	    public is_issued:any;
	    public error;

  ngOnInit() {
    this.submited=0;
    let id=parseInt(this.route.snapshot.paramMap.get('id'));
     this.requisitionService.getRequisitionReport(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  }
  handleResponse(data)
  {
    this.data=data;
    this.is_issued=this.data[0].is_issued;
     console.log(this.data);
  }
  handleError(data)
  {
    this.error=data;
    console.log(this.error);
  }
  private overConsume:number=0;
  submit()
  {
    this.submited=1;
    this.overConsume=0;
    // if(this.data)
    // console.log(this.data)
     for(let stock of this.data){
      // console.log(stock.product_available_stock+"<"+stock.quantity)
       // console.log(this.overConsume);
       if(parseFloat(stock.product_available_stock)<parseFloat(stock.quantity))
       {
        this.overConsume=1;
       }
      }
      if(this.overConsume==0)
      {
        this.requisitionService.use(this.data).subscribe(
        data => this.handleAddStockRequest(data),
        error => this.handleAddStockError(error)
        );
      }else
      {
        Swal.fire('Something Went Worng', 'Can not consume more than available Quantity . Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
      }

    
  }
  handleAddStockRequest(data)
  {
     this.submited=0;
    this.addstockConfirmation=data;
    if(data==0)
    {
      // alert("Please Check Field . Something is Missing");
      Swal.fire('Something Went Worng', 'Please Check Field . Something is Missing', 'error');
      
    }
    // console.log(this.data);
  }
  handleAddStockError(data)
  {
     this.submited=0;
    this.addstockerror=data;
    console.log(this.addstockerror);
  }

}
