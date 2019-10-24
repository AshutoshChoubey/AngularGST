import { Component, OnInit } from '@angular/core';
import { RequisitionService } from './../../Services/requisition.service';
import { ActivatedRoute }   from '@angular/router';
import { Location } from '@angular/common';
import { Router }   from '@angular/router';
import Swal from 'sweetalert2';
declare let swal: any;
declare const $;

@Component({
  selector: 'app-requisition-reports',
  templateUrl: './requisition-reports.component.html',
  styleUrls: ['./requisition-reports.component.css']
})
export class RequisitionReportsComponent implements OnInit {


	constructor(private route:ActivatedRoute,private requisitionService:RequisitionService,private location: Location,private router:Router) { }

	public requisitionReport:any=[];
	public wait:any
	public indentError:any=[];
	public requisitionDetailForUpdate:any=[];
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
	  ngOnInit() {
			this.wait=1;
			let id=parseInt(this.route.snapshot.paramMap.get('id'));
			this.requisitionService.getRequisitionReport(id).subscribe(
			data => this.handleResponse(data),
			error => this.handleError(error)
			);

	  	
	  }

	  public handleResponse(data)
	  {
		this.wait=0;
		this.requisitionReport=data;
		console.log(data);
	  }
	  public handleError(error)
	  {
	  	 	this.wait=0;
	  	this.indentError=error;
	  }
	  public goBack()
	  {
	  	this.location.back();
	  }
	  public redirectToUpdae(data)
	  {
	    this.requisitionDetailForUpdate=data;
	   
	  }
	  public updatedata={
    remarks:null,
    quantity:null

  }
  public UpdateRequisitionDetail()
  {
    this.updatedata.remarks=this.requisitionDetailForUpdate.remarks;
    this.updatedata.quantity=this.requisitionDetailForUpdate.quantity;
    if(this.requisitionDetailForUpdate.product_available_stock<this.updatedata.quantity)
    {
    	Swal.fire('Something Went Worng', ' Consume Quantity should be less than Available Quantity (During Requisition)', 'error');
    }
    else
    {
    	this.requisitionService.updateRequisitionProductDetail(this.updatedata,this.requisitionDetailForUpdate.requiitionDetailId).subscribe(
      data => this.handleUpdateRequisitionDetailResponse(data),
      error => this.handleUpdateRequisitionDetailError(error)
      );
    }
    
     // console.log(this.requisitionDetailForUpdate);
  }
  public handleUpdateRequisitionDetailResponse(data)
  {
      this.router.navigate(['/refresh']);
      Swal.fire('Info', 'Successful', 'info');
  }
  public handleUpdateRequisitionDetailError(error)
  {
     Swal.fire('Something Went Worng', 'Ohoo !!!  Sometimes You are Not Lucky', 'error');
     console.log(error);
  }
 
  public deleteRequisitionDetail(id)
  {

        var result = confirm("Want to delete?");
        if (result) {
              this.requisitionService.deleteProductRequisitionDetails(id).subscribe(
              data =>  this.handleDeleteResponse(data),
              error => this.handledeleteError(error)
              );
        }
        else{
           swal.fire("Cancelled", "Your  data is safe :)", "error");
        }
    
  }
  handleDeleteResponse(data)
  {
    swal.fire("Deleted!", "Data deleted.", "success");
    this.router.navigate(['/refresh']);
  }
  handledeleteError(error)
  {
    swal.fire("error", " Sometimes you are not Lucky", "error");
  }


}
