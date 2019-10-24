import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { RequisitionService } from './../../Services/requisition.service';
import { Router }   from '@angular/router';
 import Swal from 'sweetalert2';
declare let swal: any;
declare const $;

interface Requisition{
		created_at: Date,
		requisition_month:string,
		issued_materiaL_to:string,
		received_by:string,
		id:number,
		store_incharge:string,
		plant_incharge:string,
		requisition_discription:string,
		plant_name:string,
		requisition_department:string,
		requisition_department_nam:string
  };

@Component({
  selector: 'app-requisition-list',
  templateUrl: './requisition-list.component.html',
  styleUrls: ['./requisition-list.component.css']
})
export class RequisitionListComponent implements OnInit {

  constructor(private excelService:ExcelService,private requisitionService:RequisitionService,private router:Router) { }
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
	    componentTitle="Requisition List";
 @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Requisition>();
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['id', 'requisition_month','requisition_department_name','requisition_discription','issued_materiaL_to','plant_name','plant_incharge','received_by','store_incharge','created_at','show','add_stock','edit','delete'];
  public ListFromDatabase:any=[];
  ngOnInit() {
  	this.requisitionService.getRequisition().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	
  }
  exportAsXLSX():void {
		let str = JSON.stringify(this.ListFromDatabase);
    str = str.replace(/\"opening_stock\":/g, "\"Current Price\":");
    str = str.replace(/\"closing_stok\":/g, "\"Previous/Last Price\":");
    this.ListFromDatabase = JSON.parse(str);
    this.excelService.exportAsExcelFile(this.ListFromDatabase, 'Requisition_List');
  }
  public handleResponse(data)
  {
    this.ListFromDatabase=data;
    this.dataSource.data= data as Requisition[];
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
  public show(id)
  {
    // console.log(id);
    this.router.navigate(['/requisitionReport',id]);
  }
  public add(id)
  {
     this.router.navigate(['/useStock',id])
  }
  public delete(id)
  {


      // swal.fire({
      //     type:'warning',
      //     title: 'Are you sure to Delete indent?',
      //     text: 'You will not be able to recover the data of indent',
      //     showCancelButton: true,
      //     confirmButtonColor: '#049F0C',
      //     cancelButtonColor:'#ff0000',
      //     confirmButtonText: 'Yes, delete it!',
      //     cancelButtonText: 'No, keep it',
      //     closeOnConfirm: false
      //   }).then(() => {
      //   this.indentService.indentdelete(id).subscribe(
      //     data =>  data =>  this.handleDeleteResponse(data),
      // error => this.handledeleteError(error),
      // );
      //   }, (dismiss) => { 
      //     // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      //     if (dismiss === 'cancel') {
      //        swal.fire({
      //         type:'info',
      //         title: 'Cancelled',
      //         text: 'Your indent file is safe )'
      //       })
      //     }
      //   });


     
    // $(function(){



//       swal.fire({
//   title: 'Are you sure?',
//   text: 'You will not be able to recover !.',
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#DD6B55',
//   confirmButtonText: 'Yes!',
//   cancelButtonText: 'No.'
// }).then(() => {
//   if (result.value) {
//     this.indentService.indentdelete(id).subscribe(
//       data =>  this.handleDeleteResponse(data),
//       error => this.handledeleteError(error)
//       );
//   } else {
//      swal.fire("Cancelled", "Your  data is safe :)", "error");
//   }
// });


  //   swal.fire({
  //     title: "Are you sure?",
  //     text: "You will not be able to recover !",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonClass: "btn-danger",
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "No, cancel plx!",
  //     closeOnConfirm: false,
  //     closeOnCancel: false
  //   }).then(
  //   function(isConfirm) {
  //     // console.log(isConfirm);
  //     if (isConfirm) {
  //      this.indentService.indentdelete(id).subscribe(
  //     data =>  this.handleDeleteResponse(data),
  //     error => this.handledeleteError(error)
  //     );
        
  //     } else {
  //       swal.fire("Cancelled", "Your  data is safe :)", "error");
  //     }
  //   }); 
  //   );
  // });
        var result = confirm("Want to delete?");
        if (result) {
             this.requisitionService.requisitiondelete(id).subscribe(
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
    swal.fire("Deleted!", "Your  Requisition has been deleted.", "success");
    this.router.navigate(['/refresh']);
  }
  handledeleteError(error)
  {
    swal.fire("error", " Sometimes you are not Lucky", "error");
  }
   public edit(id)
  {
     this.router.navigate(['/UpdateRequisitionComponent',id])
  }

}
