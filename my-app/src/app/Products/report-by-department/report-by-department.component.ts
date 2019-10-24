import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';
declare const $;
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-report-by-department',
  templateUrl: './report-by-department.component.html',
  styleUrls: ['./report-by-department.component.css']
})
export class ReportByDepartmentComponent implements OnInit {

  constructor(private productService:ProductService) { }
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
public searchFunctionality={
      fromDate:null,
      todate:null,
    };
  ngOnInit() {
  	this.exportFunctionalityAdded=0;

  }
  public Search()
  {
  	this.productService.reportByDepartment(this.searchFunctionality).subscribe(
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
        this.Total+=parseFloat(data.sum);
      }
       for(let data of this.productByDepartmentstockvaluationForPurchase){
        this.Total2+=parseFloat(data.sum);
      }
       for(let data of this.productByDepartmentstockvaluationForConsume){
        this.Total3+=parseFloat(data.sum);
      }
   // console.log(this.productByDepartment);
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
      pdf.save('DepartmentWiseReport.pdf'); // Generated PDF   
    });  
  } 
  public print()
  {
    window.print();
  }
  public saveData={
  	report_name:null,
  	report_description:null,
  	stockTotal:null,
  	purchaseTotal:null,
  	consumeTotal:null,
  	fromdate:null,
  	todate:null,
  	StockValuationReport:null,
  	productByDepartmentstockvaluationForPurchase:null,
  	productByDepartmentstockvaluationForConsume:null,
  	user_id:localStorage.getItem('userId')
  }
  public saveValuationData()
  {
  	this.saveData.report_name=this.saveValuation;
  	this.saveData.report_description=this.report_description;
  	this.saveData.stockTotal=this.Total;
  	this.saveData.purchaseTotal=this.Total2;
  	this.saveData.consumeTotal=this.Total3;
  	this.saveData.fromdate=this.searchFunctionality.fromDate;
  	this.saveData.todate=this.searchFunctionality.todate;
  	this.saveData.StockValuationReport=this.productByDepartmentStockvaluation;
  	this.saveData.productByDepartmentstockvaluationForPurchase=this.productByDepartmentstockvaluationForPurchase;
    this.saveData.productByDepartmentstockvaluationForConsume=this.productByDepartmentstockvaluationForConsume;
    this.productService.saveValuationReport(this.saveData).subscribe(
      data => this.handleResponseForSaveValuationData(data),
      );
  	// console.log(this.saveData);
  }
  public handleResponseForSaveValuationData(data)
  {
  	Swal.fire('Info', 'Successful', 'info');
  }

}
