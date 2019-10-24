import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { IndentService } from './../../Services/indent.service';
import { Location } from '@angular/common';
 import Swal from 'sweetalert2';
declare let swal: any;
// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');

@Component({
  selector: 'app-update-indent',
  templateUrl: './update-indent.component.html',
  styleUrls: ['./update-indent.component.css']
})
export class UpdateIndentComponent implements OnInit {

  constructor(private indentService:IndentService,private route:ActivatedRoute,private location:Location) { }
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
  public indentListFromDatabase:any={
  indent_month:null,
  indent_discription:null
  };

  ngOnInit() {
// Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  		let id=parseInt(this.route.snapshot.paramMap.get('id'));
  	this.indentService.getIndentWIthId(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  }
   public handleResponse(data)
  {
    this.indentListFromDatabase=data;
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
	this.indentService.updateIndent(this.indentListFromDatabase.id,this.indentListFromDatabase).subscribe(
      data => this.submitedData(data),
      error => this.submitedDataError(error)
      );
}
public submitedData(data)
{
	Swal.fire('Good Job', 'Updated Successfully', 'info');
	console.log(data)
}
public submitedDataError(data)
{
	Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
	console.log(data)
}
 
}
