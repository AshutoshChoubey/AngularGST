import { Component, OnInit } from '@angular/core';
import { IndentService } from './../../Services/indent.service';
import { ActivatedRoute }   from '@angular/router';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
declare let swal: any;
declare const $;

@Component({
  selector: 'app-purchase',
 templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
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
    public error:any;
    public addstockConfirmation:any;
     public addstockerror:any
     public is_purchase:any
    
  constructor(private indentService:IndentService,private route:ActivatedRoute,private supplierService:SupplierService) { }
 settings = {
  // add: { 
  //     addButtonContent: '<i class="fa fa-plus" ></i>',
  //     createButtonContent: '<i class="fa fa-check"></i>',
  //     cancelButtonContent: '<i class="fa fa-close" ></i>',
  //   },
  hideSubHeader: true,
  actions: {
    add: false,
    },

    edit: {
      editButtonContent: '<i class="fa fa-pencil" ></i>',
      saveButtonContent: '<i class="fa fa-floppy-o" ></i>',
      cancelButtonContent: '<i class="fa fa-close" ></i>',
      confirmSave: true,
    },

    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o"></i>',
      confirmDelete: true,
    },

    columns: {
      // indent_id: {
      //   title: 'Indent Id',
      //   type: 'html',
      //   filter: false
      // },
      //  product_name: {
      //   title: 'Product Id',
      //   type: 'html',
      //   filter: false
      // }, 
      product_code: {
        title: 'Product Code',
        type: 'html',
        filter: false
      },
      productName: {
        title: 'Product Name',
        type: 'html',
        filter: false
      },
      // departmentName: {
      //   title: 'Dept. Name',
      //   type: 'html',
      //   filter: false
      // },
      quantity: {
        title: 'Quantity',
        type: 'html',
        filter: false
      },
       productIgst: {
        title: 'Product Igst',
        type: 'html',
        filter: false
      },
       productCgst: {
        type: 'html',
        title: 'Product Cgst',
        filter: false
      },
       productSgst: {
        title: 'Product Sgst',
        type: 'html',
        filter: false
      },
       productGst: {
        title: 'Product Gst',
        type: 'html',
        filter: false
      },
       product_price: {
        title: 'Product Price',
        type: 'html',
        filter: false
      },
        created_at: {
         title: 'Date',
          type: 'html',
          editor: {
            type: 'date',
          },
          filter: false
      },

    }
  };
  data = [];
  public submited:any;
  public supplierListFromDatabase:any;
  ngAfterViewInit() {
// document.getElementsByClassName('product_name')['0'].style.width = '400px'
// document.getElementsByClassName('product_price')['0'].style.width = '400px'
// document.getElementsByClassName('productGst')['0'].style.width = '400px'
// document.getElementsByClassName('productSgst')['0'].style.width = '400px'
// document.getElementsByClassName('productCgst')['0'].style.width = '400px'
// document.getElementsByClassName('productIgst')['0'].style.width = '400px'
}
    
  onSaveConfirm(event): void {
    if (window.confirm('Wait !!...   Are You Sure?')) {
      event.newData.indentId = this.data[0].indentId;
      event.newData.department = this.data[0].department;
      // console.log(event);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are You Serious !!.. Data will  delete')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // data = [
  //   {
  //     id: 1,
  //     name: "Leanne Graham",
  //     username: "Bret",
  //     email: "Sincere@april.biz"
  //   },
  //   // ... other rows here
  //   {
  //     id: 11,
  //     name: "Nicholas DuBuque",
  //     username: "Nicholas.Stanton",
  //     email: "Rey.Padberg@rosamond.biz"
  //   }
  // ];

  ngOnInit() {
     this.submited=0;
    this.overConsume=0;
    let id=parseInt(this.route.snapshot.paramMap.get('id'));
     this.indentService.getIndentDetailForPurhase(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
     this.supplierService.get().subscribe(
      data=>this.handleSupplierResponse(data)
      );
  }
  data1=[];
  handleSupplierResponse(data)
  {
    this.supplierListFromDatabase=data;
    // this.supplierListFromDatabase = data.from({length: 10000}, (value, key) => key)
    //                         .map(val => ({
    //                           id: val.id,
    //                           text: val.supplier_name
    //                         }));

    // data.forEach((item,index)=>{
    //     // console.log(item)
    //     var obj;
    //     obj={
    //       id:item.id,
    //       text:item.supplier_name,
    //     }
    //    this.data1.push(obj)
    // });
    //  this.supplierListFromDatabase=this.data1;
    //  console.log(this.supplierListFromDatabase);
    // var out = [];

// angular.forEach(data, function (obj) {
//     out.push({
//         id: obj.id,
//         text: obj.supplier_name
//     });
// });
// console.log("suppler",out);
  }
  public IndentDetailData:any;
  handleResponse(data)
  {
    this.data=data;
    for(let stock of this.data)
      {
        stock.Indentquantity=stock.quantity;
        stock.quantity=stock.quantity-stock.purchase_quantity;
         stock.quantity1=stock.quantity;
         // this.IndentDetailData.push(stock);
      }
    // console.log(this.data);
    this.is_purchase=this.data[0].is_purchase;
    // if(this.is_purchase == null)
    // {
    //   alert("Please Create another Indent and update this indent as   awrong Indent, Because In this Indent There are no any product ");
    // }
  }
  handleError(data)
  {
    this.error=data;
    // console.log(this.error);
  }
  public overConsume:number;
  addStock()
  {
     this.submited=1;
     this.overConsume=0;
     console.log(this.data);
     for(let stock of this.data){
      // console.log(stock.supplier);
      // console.log(stock.purchaseInvoie);
      // console.log(stock.quantity);

       if(stock.supplier==''|| typeof(stock.supplier) == "undefined"  || typeof(stock.purchaseInvoie) == "undefined" || typeof(stock.quantity) == "undefined" || stock.quantity=='' || stock.purchaseInvoie=='')
        {
         this.overConsume=1;
        }
        if(stock.quantity>stock.quantity1)
        {
         this.overConsume=2;
        }
      }

      if(this.overConsume==0)
      {
         this.indentService.addStock(this.data).subscribe(
      data => this.handleAddStockRequest(data),
      error => this.handleAddStockError(error)
        );
      }else if(this.overConsume==2)
      {
        Swal.fire('error', 'You cant Purchase More Than Indent Quantity', 'error');
        this.submited=0;
      }
      else
      {
        Swal.fire('Something is Missing', 'Please Contact Software Maintanance Team.', 'error');
        this.submited=0;
     }
  }
  handleAddStockRequest(data)
  {
     this.submited=0;
    this.addstockConfirmation=data;
    if(data==0)
    {
        Swal.fire('Something is Missing', 'Please Check Input Field', 'error');
    
      //alert("Please Check Field . Something is Missing");
    }
    // console.log(this.data);
  }
  handleAddStockError(data)
  {
     this.submited=0;
    this.addstockerror=data;
    // console.log(this.addstockerror);
  }
  onItemDeleted(index: number){
    this.data.splice(index, 1);
    // this.fieldArray.splice(index, 1);
    console.log(this.data);
  }



  // data = [];
    
  // // Einstellungen

  // settings = {

  //   // Meldung wenn keine Daten gefunden wurden oder tbody leer ist

  //   noDataMessage: 'Es wurden keine Daten gefunden',

  //   // Aktionen

  //   actions: {
  //     columnTitle: 'Aktionen',
  //   },

  //   // Seitenzahl

  //   pager: {
  //     display: true,
  //     perPage: 10,
  //   },

  //   // CRUD

  //   add: {
  //     addButtonContent: '<i class="fa fa-plus" title="hinzufügen"></i>',
  //     createButtonContent: '<i class="fa fa-check" title="erstellen"></i>',
  //     cancelButtonContent: '<i class="fa fa-close" title="abbrechen"></i>',
  //   },

  //   edit: {
  //     editButtonContent: '<i class="fa fa-pencil" title="bearbeiten"></i>',
  //     saveButtonContent: '<i class="fa fa-floppy-o" title="speichern"></i>',
  //     cancelButtonContent: '<i class="fa fa-close" title="abbrechen"></i>',
  //     confirmSave: true,
  //   },

  //   delete: {
  //     deleteButtonContent: '<i class="fa fa-trash-o"></i>',
  //     confirmDelete: true,
  //   },

  //   // Filter

  //   filter: {
  //     inputClass: 'filter-smart-table'
  //   },

  //   // Spalten

  //   columns: {
  //     bez: {
  //       title: 'Bez',
  //       filter: {
  //         type: 'default',
  //         config: {
  //           default: {
  //             data: this.data,
  //             searchFields: 'bez',
  //             titleField: 'bez',
  //           },
  //         },
  //       },
  //     },
  //     jan: {
  //       title: 'Jan',
  //       filter: false,
  //     },
  //     feb: {
  //       title: 'Feb',
  //       filter: false,
  //     },
  //     mrz: {
  //       title: 'Mrz',
  //       filter: false,
  //     },
  //     apr: {
  //       title: 'Apr',
  //       filter: false,
  //     },
  //     mai: {
  //       title: 'Mai',
  //       filter: false,
  //     },
  //     jun: {
  //       title: 'Jun',
  //       filter: false,
  //     },
  //     jul: {
  //       title: 'Jul',
  //       filter: false,
  //     },
  //     aug: {
  //       title: 'Aug',
  //       filter: false,
  //     },
  //     sep: {
  //       title: 'Sep',
  //       filter: false,
  //     },
  //     okt: {
  //       title: 'Okt',
  //       filter: false,
  //     },
  //     nov: {
  //       title: 'Nov',
  //       filter: false,
  //     },
  //     dez: {
  //       title: 'Dez',
  //       filter: false,
  //     },
  //   },
  // };


}
