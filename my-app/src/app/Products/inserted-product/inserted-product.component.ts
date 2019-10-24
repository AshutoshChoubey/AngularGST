import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-inserted-product',
  templateUrl: './inserted-product.component.html',
  styleUrls: ['./inserted-product.component.css']
  // inputs:['submitResponse']
})
export class InsertedProductComponent implements OnInit {

  constructor() { }
@Input() submitResponse;
  ngOnInit() {
  }

}
