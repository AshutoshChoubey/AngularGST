import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Router }   from '@angular/router';
import { Location } from '@angular/common';
// import { Location } from '@angular/common';
 

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router,private location:Location) { }
 submitResponse = [];
  ngOnInit() {
  		let id=parseInt(this.route.snapshot.paramMap.get('id'));
  	this.productService.getProductById(id).subscribe(
      data => this.handleResponse(data),
      );
  }
  public handleResponse(data)
  {
  	 this.submitResponse = data;
  }
  public goBack()
  {
    this.location.back();
  }

}
