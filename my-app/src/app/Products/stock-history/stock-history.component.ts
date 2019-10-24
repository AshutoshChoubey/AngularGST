import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
declare const $;

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {

  constructor(private productService:ProductService) { }
  public stockHistory:any;
  public exportFunctionalityAdded:any;
  public clicked:any;

  ngOnInit() {
  	this.clicked=0;
     this.productService.savevaluations().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  	}
	public handleResponse(data)
	{
		this.stockHistory=data
		// console.log(this.stockHistory);
		 this.exportFunctionalityAdded=0;
	}
	public handleError(error)
	{
		console.log(error);
	}
	 public exportButton()
	{
	 this.exportFunctionalityAdded=1;
		$(function(){
			$('#example').DataTable( {
			dom: 'Bfrtip',
			buttons: [
			{ extend: 'copyHtml5', footer: true ,title: 'Product Stock Report'},
			{ extend: 'excelHtml5', footer: true ,title: 'Product Stock Report'},
			{ extend: 'csvHtml5', footer: true,title: 'Product Stock Report' },
			{ extend: 'pdfHtml5', footer: true ,title: 'Product Stock Report',orientation: 'landscape',
			pageSize:'A3'
			}

			]
			} );

		});
	}

	}
 