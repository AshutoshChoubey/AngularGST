import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import { IndentService } from './../../Services/indent.service';
import { Router }   from '@angular/router';
 import Swal from 'sweetalert2';
declare let swal: any;
declare const $;
// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');

interface Indent{
    created_at: Date,
    indent_month:string,
    indent_discription:string,
    indent_department_name:string,
    id:number
  };

@Component({
  selector: 'app-indent-list',
  templateUrl: './indent-list.component.html',
  styleUrls: ['./indent-list.component.css']
})
export class IndentListComponent implements OnInit {
 
  constructor(private excelService:ExcelService,private indentService:IndentService,private router:Router) { }
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
    componentTitle="Indent List";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Indent>();
  @ViewChild(MatSort) sort: MatSort;
 

  public displayedColumns = ['id', 'indent_month','indent_discription','indent_department_name','created_at','show','download','edit','add_stock','delete'];
  public indentListFromDatabase:any=[];
  ngOnInit() {
  	this.indentService.getIndent().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	
  }
  exportAsXLSX():void {
    // this.productListFromDatabase=data;
    let str = JSON.stringify(this.indentListFromDatabase);
    str = str.replace(/\"opening_stock\":/g, "\"Current Price\":");
    str = str.replace(/\"closing_stok\":/g, "\"Previous/Last Price\":");
    this.indentListFromDatabase = JSON.parse(str);

    this.excelService.exportAsExcelFile(this.indentListFromDatabase, 'Indent_Report');
  }
  public handleResponse(data)
  {
    this.indentListFromDatabase=data;
    this.dataSource.data= data as Indent[];
  }
  public handleError(error)
  {
    // Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  	console.log(error);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public showIndent(id)
  {
    // console.log(id);
    this.router.navigate(['/indent-report',id])
  }
  downloadIndent(id)
  {
     this.router.navigate(['/indent-download',id])
  }
  public addStock(id)
  {
    // console.log(id);
    this.router.navigate(['/add-stock',id])
  }
  public editIndent(id)
  {
     this.router.navigate(['/UpdateIndentComponent',id])
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
             this.indentService.indentdelete(id).subscribe(
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
    swal.fire("Deleted!", "Your  indent has been deleted.", "success");
    this.router.navigate(['/refresh']);
  }
  handledeleteError(error)
  {
    swal.fire("error", " Sometimes you are not Lucky", "error");
  }
  


} 
