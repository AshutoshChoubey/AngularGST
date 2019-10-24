import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { RequisitionService } from './../../Services/requisition.service';
import { ProductService } from './../../Services/product.service';
import { Router }   from '@angular/router';
 import Swal from 'sweetalert2';
declare let swal: any;
declare const $;

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.css']
})
export class RequisitionComponent implements OnInit {
public submitClicked:number;
public addmore: FormGroup;
public departmentLists = [];
public productLists = [];
public productNameLists = [];
public error :any;
public productDetailForProductId:any=[];
public requisitionData:any=[];
public productListFiltered=[];
public productDep:any;


  constructor(private _fb: FormBuilder,private departmentService:DepartmentServiceService,private productService:ProductService,private requisitionService:RequisitionService,private router:Router) { }
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
  public form = {
    requisition_month: null,
    requisition_department: null,
    requisition_department_name: null,
    requisition_discription: null,
    created_by: localStorage.getItem('userId'),
    issued_materiaL_to:null,
    received_by:null,
    store_incharge:null,
    plant_incharge:null,
    plant_name:null
  };
  ngOnInit() { 
    this.addmore = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });
     this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
     this.productService.getProduct().subscribe(
      data => this.setproductList(data)
      );
       this.submitClicked = 0;
  }
  setproductList(data)
  {
    this.productLists=data
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
    product_code:[''],
    product_id:[''],
    speciaman:[''],
    make:[''],
    unit:[''],
    quantity:[''],
    purpose:[''],
    bf_stock:[''],
    remarks:['']
    });
  }
   onSubmit() {

      this.form.requisition_department_name=this.productDep[0].department;
      this.submitClicked = 1;
      this.requisitionService.save(this.form).subscribe(
      data => this.handleSubmitResponse(data),
      error => this.handleSubmitError(error)
      );

  }
  handleSubmitResponse(data)
  {
    let indentId=data.id;

     let requisitinDetail=[this.addmore.value,data.id,data.requisition_department];
     this.requisitionService.requisitionSave(requisitinDetail).subscribe(
      data => this.indentDiscription(data,indentId),
      error => this.handleRequisitionSubmitError(error,indentId)
      );

  }
  handleRequisitionSubmitError(error,requisitionId)
  {
      this.requisitionService.requisitiondelete(requisitionId).subscribe(
      data => console.log('privious Requisition deleted Successfully')
      );
        // $(".reset").val(null);
      Swal.fire('Something Went Worng', 'Ohoo !!!  Sometimes You are Not Lucky', 'error');
      // alert("Please Cheack Available Quantity and Requested Consume Quantity");
      // $(".reset").val(null);
      this.router.navigate(['/refresh']);
  }
  indentDiscription(data,id)
  {
    // this.productDep[0].department=null;
    // this.requisitionData=data;
    if(data==0)
    {
      this.requisitionService.requisitiondelete(id).subscribe(
      data => console.log('privious Requisition deleted Successfully')
      );
        // $(".reset").val(null);
      Swal.fire('Something Went Worng', 'Consume Quantity can not be greater than Available Quantity.Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
      // alert("Please Cheack Available Quantity and Requested Consume Quantity");
      // $(".reset").val(null);
      this.router.navigate(['/refresh']);
    }
    else
    {
      Swal.fire('Info', 'Successful', 'info');
       this.router.navigate(['/requisitionReport',data]);
    }
     this.submitClicked = 0;
    
    // console.log(data);
  }
  handleSubmitError(data)
  {
     // this.productDep[0].department=null;
     Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
    this.submitClicked = 0;
    console.log(data);
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
   public handleResponse(data) {
    this.submitClicked = 0;
    this.departmentLists = data;
  }
  public handleError(error) {
    this.submitClicked = 0;
    this.error = error.statusText + ' For Department List';
 
   
  }
  public onProductCodeChange(id,i)
  {
    this.productDetailForProductId =  this.productLists.filter(x => x.id == id);
    // console.log( this.productDetailForProductId[0].id);
    (<HTMLInputElement>document.getElementById(i)).value = this.productDetailForProductId[0].product_code;
     (<HTMLInputElement>document.getElementById("bfStock"+i)).value = this.productDetailForProductId[0].available_stock;
      (<HTMLInputElement>document.getElementById("make"+i)).value = this.productDetailForProductId[0].product_make;
       (<HTMLInputElement>document.getElementById("speciaman"+i)).value = this.productDetailForProductId[0].product_specimen;
        (<HTMLInputElement>document.getElementById("unit"+i)).value = this.productDetailForProductId[0].product_unit;
    this.addmore.value.itemRows[i].bf_stock=this.productDetailForProductId[0].available_stock;
     // console.log(this.addmore.value.itemRows[i].bf_stock);
     // console.log(this.addmore.controls.itemRows.value[i].bf_stock);
     // console.log(this.addmore.value);
      // console.log(this.productDetailForProductId[0].available_stock);
      // var event = new Event('change');
       // var eventClick = new Event('click');
       // console.log(this.addmore.value.itemRows[i].bf_stock);

      // Dispatch it.
      // (<HTMLInputElement>document.getElementById(i)).dispatchEvent(event);
        // (<HTMLInputElement>document.getElementById("bfStock"+i)).dispatchEvent(event);
         // (<HTMLInputElement>document.getElementById("bfStock"+i)).type = this.productDetailForProductId[0].available_stock;
    // this.persons =  this.personService.getPersons().find(x => x.id == this.personId);
  }
    public onProductCode(value,i)
  {
    this.productDetailForProductId =  this.productLists.filter(x => x.product_code == value);
    // console.log( this.productDetailForProductId[0].id);
       // console.log( this.productDetailForProductId);
    (<HTMLInputElement>document.getElementById("productName"+i)).value = this.productDetailForProductId[0].id;
    //  (<HTMLInputElement>document.getElementById("bfStock"+i)).value = this.productDetailForProductId[0].available_stock;
    //   (<HTMLInputElement>document.getElementById("make"+i)).value = this.productDetailForProductId[0].product_make;
    //    (<HTMLInputElement>document.getElementById("speciaman"+i)).value = this.productDetailForProductId[0].product_specimen;
     
    // this.addmore.value.itemRows[i].bf_stock=this.productDetailForProductId[0].available_stock;
    
      var event = new Event('change');
      (<HTMLInputElement>document.getElementById("productName"+i)).dispatchEvent(event);
  }
  public onDepartmentChange(indent_department)
  {
     this.productListFiltered =  this.productLists.filter(x => x.product_department == indent_department);
      this.productDep =  this.departmentLists.filter(x => x.id == indent_department);
        $(".reset").val(null);
     // console.log(this.productListFiltered);
      // console.log(this.productLists);
       // console.log(indent_department);
  }
  //  public showIndent(data)
  // {
  //   // console.log(id);
  //   this.router.navigate(['/requisitionReport',data]);
  // }

}
