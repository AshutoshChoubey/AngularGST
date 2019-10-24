import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { IndentService } from './../../Services/indent.service';
import { Router }   from '@angular/router';
import { Location } from '@angular/common';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import Swal from 'sweetalert2';
declare let swal: any;
declare const $;
import * as jsPDF from 'jspdf';
 import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-download-indent',
  templateUrl: './download-indent.component.html',
  styleUrls: ['./download-indent.component.css']
})
export class DownloadIndentComponent implements OnInit {

  constructor(private _electronService: ElectronService,private route:ActivatedRoute,private indentService:IndentService,private location:Location,private router:Router) { }
public indentReport:any=[];
public indentError:any=[];
public indentDetailForUpdate:any=[];
public dataForUpdate:any=[];
public currentDate:any;
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
  ngOnInit() {
  	this.currentDate = new Date();
    this.exporterButton=1;
  	let id=parseInt(this.route.snapshot.paramMap.get('id'));
  	this.indentService.getIndentDetail(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	
  }
public exporterButton:number;
  public handleResponse(data)
  {
  	this.indentReport=data;
    // console.log(this.indentReport);
  }
  public handleError(error)
  {
  	this.indentError=error;
  	//console.log(error);
  }
  public goBack()
  {
    this.location.back();
  }
  public redirectToUpdae(data)
  {
    this.indentDetailForUpdate=data;
   
  }
  public updatedata={
    remarks:null,
    quantity:null

  }
  public UpdateIndentDetail()
  {
    this.updatedata.remarks=this.indentDetailForUpdate.remarks;
    this.updatedata.quantity=this.indentDetailForUpdate.quantity;
    this.indentService.updateIndentProductDetail(this.updatedata,this.indentDetailForUpdate.id).subscribe(
      data => this.handleUpdateIndentDetailResponse(data),
      error => this.handleUpdateIndentDetailError(error)
      );
     // console.log(this.indentDetailForUpdate);
  }
  public handleUpdateIndentDetailResponse(data)
  {
      
      this.router.navigate(['/refresh']);
      Swal.fire('Info', 'Successful', 'info');
  }
  public handleUpdateIndentDetailError(error)
  {
     Swal.fire('Something Went Worng', 'Ohoo !!!  Sometimes You are Not Lucky', 'error');
     // console.log(error);
      // Swal.fire('Info', 'Successful', 'info');
      // this.router.navigate(['/refresh']);
  }
  // public deleteIndentDetail(id)
  // {
  //   this.indentService.deleteProductIndentDetails(id).subscribe(
  //     data => console.log("Indent details for Product Deleted Successfull")
  //     );
  //     this.router.navigate(['/refresh']);
  // }
  public deleteIndentDetail(id)
  { 

        var result = confirm("Want to delete?");
        if (result) {
              this.indentService.deleteProductIndentDetails(id).subscribe(
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
    swal.fire("Deleted!", "Data deleted.", "success");
    this.router.navigate(['/refresh']);
  }
  handledeleteError(error)
  {
    swal.fire("error", " Sometimes you are not Lucky", "error");
  }
   public exportButton()
  {
    // Swal.fire('Info','First Apply Search condition then Use Pagination or Export functionality by clicking on button', 'success');
    // this.exportFunctionalityAdded=1;
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
      pdf.save('Indent.pdf'); // Generated PDF   
    });  
  } 
  public download()
  {
        // var doc = new jsPDF();
      // doc.text('Hello world!', 10, 10);
   // var data = document.getElementById('contentToConvert');  
    // doc.text(data, 10, 10);
        //  doc.save('C:\\Users\\GMC\\Desktop\\salvataggi\\a4.pdf')
    //     this._electronService.ipcRenderer.send('print-to-pdf',doc.output('blob'));

    //   this._electronService.ipcRenderer.on('wrote-pdf', pdfPath => {
    //     this._electronService.shell.openItem(pdfPath)

    // });

//       const  printPDFButton=document.getElementById('print-pdf');
// printPDFButton.addEventListener('click',function(event){
    // ipc.send('print-to-pdf');
    this._electronService.ipcRenderer.send('print-to-pdf');

// });
// ipc.on('wrote-pdf',function(event,path){
//     const message='Wrote pdf to:`${path}`';
//     document.getElementById('pdf-path').innerHTML=message;
// })

  }
  public print()
  {
//     w=window.open();
// w.document.write($('#contentToConvert').html());
// w.print();
// w.close();

    window.print();
  }
}
