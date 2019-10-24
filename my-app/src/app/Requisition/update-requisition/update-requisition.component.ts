import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { RequisitionService } from './../../Services/requisition.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
declare let swal: any;

@Component({
  selector: 'app-update-requisition',
  templateUrl: './update-requisition.component.html',
  styleUrls: ['./update-requisition.component.css']
})
export class UpdateRequisitionComponent implements OnInit {

  constructor(private requisitionService:RequisitionService,private route:ActivatedRoute,private location:Location) { }
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

  public requisitionListFromDatabase:any={
	  issued_materiaL_to:null,
	  plant_incharge:null,
	  plant_name:null,
	  received_by:null,
	  requisition_discription:null,
	  requisition_month:null,
	  store_incharge:null
  };

  ngOnInit() {
  		let id=parseInt(this.route.snapshot.paramMap.get('id'));
  	this.requisitionService.getRequisitionById(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  }
   public handleResponse(data)
  {
  	// console.log(data);
    this.requisitionListFromDatabase=data;
  }
  public handleError(error)
  {
  	// Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  	console.log(error);
  }
public goBack()
{
  this.location.back();
}
public onSubmit()
{
	this.requisitionService.updateRequisition(this.requisitionListFromDatabase.id,this.requisitionListFromDatabase).subscribe(
      data => this.submitedData(data),
      error => this.submitedDataError(error)
      );
}
public submitedData(data)
{
	Swal.fire('Good Job', 'Updated Successfully', 'info');
	// console.log(data)
}
public submitedDataError(data)
{
	Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
	console.log(data)
}
 

}
