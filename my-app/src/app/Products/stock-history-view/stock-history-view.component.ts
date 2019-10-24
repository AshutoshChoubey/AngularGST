import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute }   from '@angular/router';
import Swal from 'sweetalert2';
declare const $;
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-stock-history-view',
  templateUrl: './stock-history-view.component.html',
  styleUrls: ['./stock-history-view.component.css']
})
export class StockHistoryViewComponent implements OnInit {

  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  
  public productByDepartmentStockvaluation:any;
public productByDepartmentstockvaluationForPurchase:any;
public productByDepartmentstockvaluationForConsume:any;
public exportFunctionalityAdded:number;
public saveValuation:any;
public report_description:any;
public Total:number=0;
public Total2:number=0;
public Total3:number=0;
public exporterButton:number;

  ngOnInit() {
  	this.exportFunctionalityAdded=0;
  	 let id=parseInt(this.route.snapshot.paramMap.get('id'));
  	   this.productService.getViewSavedStock(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );

  }
  public handleResponse(data) 
  {
	this.productByDepartmentStockvaluation=data.stockvaluation;
	this.productByDepartmentstockvaluationForPurchase=data.stockvaluationForPurchase;
	this.productByDepartmentstockvaluationForConsume=data.stockvaluationForConsume;
	this.exportFunctionalityAdded=1;
	this.exporterButton=1;
   for(let data of this.productByDepartmentStockvaluation){
        this.Total+=parseFloat(data.price);
      }
       for(let data of this.productByDepartmentstockvaluationForPurchase){
        this.Total2+=parseFloat(data.price);
      }
       for(let data of this.productByDepartmentstockvaluationForConsume){
        this.Total3+=parseFloat(data.price);
      }

   // console.log(this.productByDepartmentStockvaluation);
   // console.log("productByDepartmentstockvaluationForPurchase",this.productByDepartmentstockvaluationForPurchase);
   // console.log(this.productByDepartmentstockvaluationForConsume);
  }
  public handleError(error)
  {
  	console.log(error);
  }
  public exportButton()
  {
    this.exporterButton=0;
     $(function(){
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Purchase Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Purchase Report',orientation: 'landscape',pageSize:'A3'}
        ]
    } );
     $('#example2').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Purchase Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Purchase Report',orientation: 'landscape',pageSize:'A3'}
        ]
    } );
      $('#example3').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Purchase Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Purchase Report',orientation: 'landscape',pageSize:'A3'}
        ]
    } );

      });
  }
   public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('stockHistoryView.pdf'); // Generated PDF   
    });  
  } 
  public print()
  {
    window.print();
  }

}
