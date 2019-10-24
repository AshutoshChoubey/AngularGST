import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { IndentService } from './../../Services/indent.service';
import { ProductService } from './../../Services/product.service';
import { Router }   from '@angular/router';
 import Swal from 'sweetalert2';
declare let swal: any;
declare const $;

@Component({
  selector: 'app-indent-add',
  templateUrl: './indent-add.component.html',
  styleUrls: ['./indent-add.component.css']
})
export class IndentAddComponent implements OnInit {

  public submitClicked:number;
public addmore: FormGroup;
public departmentLists = [];
public productLists = [];
public productNameLists = [];
public error :any;
public productDetailForProductId:any=[];
public indentReport:any=[];
public productListFiltered=[];
public productDep:any;

 
  constructor(private _fb: FormBuilder,private departmentService:DepartmentServiceService,private indentService:IndentService,private productService:ProductService,private router:Router) { }
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
    }
    ]; 
  public form = {
    indent_month: null,
    indent_department: null,
    indent_department_name: null,
    indent_discription: null,
    created_by: localStorage.getItem('userId')
  };
   public form2 = {
    indent_month: null,
    indent_department: null,
    indent_department_name: null,
    indent_discription: null,
    created_by: localStorage.getItem('userId')
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
    // $('.select2').select2();
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  } 

  initItemRows() {
    return this._fb.group({
    product_code:[''],
    product_name:[''],
    speciaman:[''],
    make:[''],
    quantity:[''],
    purpose:[''],
    bf_stock:[''],
    remarks:['']
    });
  }
  public SearchProd:number;
  public validation:number;
   onSubmit() {
    this.SearchProd=0;
    var result = confirm("Are You Sure ?");
        if (result) {


  this.validation=0;
     // console.log(this.data);
     let coutArray:number=0;
     // console.log("ft");
     for(let stock of this.mainArray){
      // console.log(stock.supplier);
      // console.log(stock.purchaseInvoie);
      // console.log("ft");

       if(stock.quantity==''|| typeof(stock.quantity) == "undefined"  || typeof(stock.purpose) == "undefined" || typeof(stock.purpose) == "undefined" || stock.remark=='' || stock.remark=='' || typeof(stock.remark) == "undefined")
        {
         this.validation=1;
        }
        
        coutArray++;
        // console.log(coutArray);
      }
      // console.log(coutArray);
      if(coutArray==0)
      {
        this.validation=5;
      }
       if(this.form.indent_department==null)
      {
        this.validation=4;
      }
      if(this.validation==0 && coutArray!=0 && this.form.indent_department!=null)
      {
        this.form.indent_department_name=this.productDep[0].department;
        this.submitClicked = 1;
        this.indentService.save(this.form).subscribe(
        data => this.handleSubmitResponse(data),
        error => this.handleSubmitError(error)
        );
      }
      else if(this.validation==1){
         Swal.fire('Something is Missing', 'Please Contact Software Maintanance Team.', 'error');
       
      } else if(this.validation==4){
         Swal.fire('Department is Missing', 'Please  check your Department.', 'error');
       
      }
      else if(this.validation==5){
         Swal.fire('Add Product', 'Add atleast one product.', 'error');
       
      }else{
         Swal.fire('Something is Missing', 'Please Contact Software Maintanance Team.', 'error');
      }

          
        }
        else{
           swal.fire("Cancelled", "ok Check your field :)", "error");
        }

    
  }
  handleSubmitResponse(data)
  {
    let indentId=data.id;

     this.indentService.indentMake(this.mainArray,data.id,data.indent_department).subscribe(
      data => this.indentDiscription(data,indentId),
      error => this.handleIndentDiscriptionError(error,indentId)
      );

 this.submitClicked = 0;
  }
  handleIndentDiscriptionError(error,indentId)
  {
      this.indentService.indentdelete(indentId).subscribe(
      data =>  console.log("Incorrect indent successfully deleted")
      );

       $(".reset").val(null);
        console.log(error);
  }
  // ngAfterViewInit()
  // {
  //   $('.select2').select2();
  // }
  indentDiscription(data,id)
  {
    // this.indentService.getIndentDetail(id).subscribe(
    //   data => this.handleResponse(data),
    //   error => this.handleError(error)
    //   ); 
 this.submitClicked = 0;
    if(data==0)
    {
      // this.indentService.indentdelete(id).subscribe(
      // data => console.log('privious indent deleted Successfully')
      // );
      // this.indentService.indentdelete(id).subscribe(
      // data => console.log('privious indent deleted Successfully')
      // );
      this.indentService.indentdelete(id).subscribe(
      data =>  console.log("Incorrect indent successfully deleted")
      );

       $(".reset").val(null);
       Swal.fire('Something Went Worng', 'Please Check Input Field.For More Information Contact Software Maintanance Team', 'error');
    }
    
     this.router.navigate(['/indent-report',data]);
     Swal.fire('Info', 'Successful', 'info');
    // this.indentReport=data;
    // console.log(data);
     // console.log(this.indentReport);
    
  }
  handleSubmitError(data)
  {
     Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
      this.submitClicked = 0;
    // console.log(data);
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
    console.log(this.addmore.value.itemRows);
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
        // Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
 
   
  }
 
  public onProductCodeChange(id,i)
  {
    this.productDetailForProductId =  this.productLists.filter(x => x.id == id);
    console.log("goods");
    (<HTMLInputElement>document.getElementById(i)).value = this.productDetailForProductId[0].product_code;
     (<HTMLInputElement>document.getElementById("bfStock"+i)).value = this.productDetailForProductId[0].available_stock;
      (<HTMLInputElement>document.getElementById("make"+i)).value = this.productDetailForProductId[0].product_make;
       (<HTMLInputElement>document.getElementById("speciaman"+i)).value = this.productDetailForProductId[0].product_specimen;
      
     // this.addmore.itemRows[i].bf_stock= this.productDetailForProductId[0].available_stock;
    // console.log((<HTMLInputElement>document.getElementById(i)).value);
    // let persons =  this.productLists.filter(id ==product_code); 
    // console.log(this.addmore.controls.itemRows.value[0].bf_stock);
    // this.addmore.controls.itemRows.value[0].bf_stock=this.productDetailForProductId[0].available_stock;
    // console.log(i);
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
    // document.getElementsByClassName("reset")[0].value = null;
  //     let x1 = document.getElementsByClassName("reset");
  // x1[0].value = null;
    $(".reset").val(null);
     $(".reset1").val('');
     this.productListFiltered =  this.productLists.filter(x => x.product_department == indent_department);
      this.productDep =  this.departmentLists.filter(x => x.id == indent_department);
       if($('#select2ProName').select2())
           {
             $(".select2-container").css({'line-height': '0px','height': '40px'});
          $(".select2-selection--single").css({"line-height": "0px","height": "40px"});
           }
       if($('#select2ProId').select2()){
         $(".select2-container").css({'line-height': '0px','height': '40px'});
          $(".select2-selection--single").css({"line-height": "0px","height": "40px"});
       }
      // $('#select2ProName').select2();
      //  $('#select2ProId').select2();
      //   $(".select2_demo_1").select2();
        $('.hideField').show();
      //   $(".select2-container").css({'line-height': '0px','height': '40px'});
      //   $(".select2-selection--single").css({"line-height": "0px","height": "40px"});

      // this.addmore.value=[];
     // console.log(this.productListFiltered);
      // console.log(this.productLists);
       // console.log(indent_department);
     
  }
   public showIndent(id)
  {
    // console.log(id);
    this.router.navigate(['/indent-report',id])
  }
  public mainArray:any=[];
  public ProductAdd:any=[];
  public ProductId:any=[];
  public addInArray1()
  {
    this.ProductId=$('#select2ProName').val();
  	 this.ProductAdd =  this.productLists.filter(x => x.id == this.ProductId);
  	this.ProductAdd.quantity=null;
  	this.ProductAdd.purpose=null;
  	this.ProductAdd.remark="ok";
    // this.ProductAdd.speciaman=this.ProductAdd.product_specimen;
    //  this.ProductAdd.make=this.ProductAdd.product_make;
    //  console.log(this.ProductAdd);
    
  	 this.mainArray=this.mainArray.concat(this.ProductAdd);
  	  console.log(this.mainArray);
  }
  public addInArray2()
  {
    this.ProductId=$('#select2ProId').val();
     this.ProductAdd =  this.productLists.filter(x => x.id == this.ProductId);
    this.ProductAdd.quantity=null;
    this.ProductAdd.purpose=null;
    this.ProductAdd.remark="ok";
     this.mainArray=this.mainArray.concat(this.ProductAdd);
      console.log(this.mainArray);
  }
  public onItemDeleted(index: number){
    this.mainArray.splice(index, 1);
    // this.fieldArray.splice(index, 1);
    // console.log(this.data);
  }
  public searchPr()
  {
    this.SearchProd=1;
    $('.hideField').hide();

     $(function(){
     $('#example').DataTable( {
       
            } );

      });


  }
  public addProductOnIndent(ProId)
  {

     this.ProductAdd =  this.productLists.filter(x => x.id == ProId);
    this.ProductAdd.quantity=null;
    this.ProductAdd.purpose=null;
    this.ProductAdd.remark="ok";
     this.mainArray=this.mainArray.concat(this.ProductAdd);
  }
}
