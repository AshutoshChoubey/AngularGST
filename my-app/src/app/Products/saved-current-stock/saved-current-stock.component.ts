import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { ActivatedRoute }   from '@angular/router';
declare const $;

@Component({
  selector: 'app-saved-current-stock',
  templateUrl: './saved-current-stock.component.html',
  styleUrls: ['./saved-current-stock.component.css']
})
export class SavedCurrentStockComponent implements OnInit {

   constructor(private productService:ProductService,private departmentService:DepartmentServiceService,private route:ActivatedRoute) { }
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
    componentTitle="Product Stock Report";
    valuation_id:number;
    public exporterButton:number;
    public productData:any;
    public grandtopalWithTax:number;
    public exportFunctionalityAdded:number;
    // public searchFunctionality={
    //   fromDate:null,
    //   todate:null,
    //   productCode:null
    // };

  ngOnInit() {
     this.Total=0;
     this.exportFunctionalityAdded=0;
      let id=parseInt(this.route.snapshot.paramMap.get('id'));
      this.valuation_id=id;
     this.departmentService.getProductDepartment().subscribe(
      data => this.handleResponseForDepartment(data),
      error => this.handleErrorFordepartment(error)
      );
    this.productService.getSavedProduct(id).subscribe(
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
     // this.artificialArray = []
     //        data.forEach((item, index) => {
     //          this.artificialArray.push(item.id);
     //           this.artificialArray.push(item.department);
     //        });
     //        console.log(this.artificialArray)
  }

  handleErrorFordepartment(data)
  {
     Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }
  public Total:number;
  public dataProd:any;
  public handleResponse(data) 
  {
    this.Total=0;
   this.dataProd=data;
    for(let data of this.dataProd){
        this.Total+=(parseFloat(data.opening_stock)+(parseFloat(data.opening_stock)*parseFloat(data.product_gst))/100)*parseFloat(data.available_stock);
        data.opening_stock=parseFloat(data.opening_stock);
        data.available_stock=parseFloat(data.available_stock);
        data.product_gst=parseFloat(data.product_gst);
      }
        this.productData=data;
      // this.Total= this.Total.toFixed(2); 
      // this.Total=this.roundN(this.Total,2);
      // console.log(this.productData);
      // console.log(this.Total);
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
    Swal.fire('Info','First Apply Search condition then Use Pagination or Export functionality by clicking on button', 'success');
    this.exportFunctionalityAdded=1;
    this.exporterButton=0;
     $(function(){
    //      $('#example').DataTable( {
    //       dom:'Bfrtip',
    //   buttons: [ 'copy', 'excel', 'pdf','colvis' ]
    // } );
     $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Stock Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Stock Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Stock Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Stock Report',orientation: 'landscape',
  //           customize: function (doc) {
  //   doc.content[1].table.widths = 
  //       Array(doc.content[1].table.body[0].length + 1).join('*').split('');
  // },
  pageSize:'A3'
}

        ]
    } );

      });
  }

  public  clicked:any;
  public searchFunctionality={
      fromDate:null,
      todate:null,
      productCode:null,
      departmentId:null,
      valuation_id:null,
    };

  public Search()
  {
    this.clicked=1;
     this.searchFunctionality.valuation_id=this.valuation_id;
     this.productService.currentProductStockSearch(this.searchFunctionality).subscribe(
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
         this.Total+=(data.opening_stock+ (data.opening_stock*data.product_gst)/100)*data.available_stock;
      }
    Swal.fire('Good','Data fetched !! now you can appliy data exporter functionality by clicking on button for lattest filterd data', 'success');
  }
  public searchedProductError(error)
  {
    this.clicked=0;
      Swal.fire('Something Went Worng', 'Please Contact Software Maintanance Team(ex:Phoenix Software)', 'error');
  }
//   public roundN(num,n){
//   return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
// }

}
