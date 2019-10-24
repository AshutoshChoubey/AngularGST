import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brad',
  templateUrl: './brad.component.html',
  styleUrls: ['./brad.component.css']
})
export class BradComponent implements OnInit {

  constructor() { }
  public brads = [{
      name: 'Add Product',
      url: '/addProduct'
    },
    {
      name: 'Dashboard',
      url: '/dashboard'
    },
     {
      url: '/searchProduct',
      name: 'Search Product'
    },
    {
      url: '/purchaseReport',
      name: 'Purchase Report'
    },
    {
      url: '/addDepartment',
      name: 'Add Department'
    },
     {
      url: '/indent',
      name: 'Indent'
    },
    {
      url: '/indentList',
      name: 'Indent List'
    },
    {
      url: '/requisition',
      name: 'Requisition'
    },
    {
      url: '/requisitionList',
      name: 'Requisition List'
    },
    {
      url: '/consumptionReport',
      name: 'Consumption Report'
    },
    {
       url: '/consumptionReport',
      name: 'Consumption Report'
    },
    {
      url: '/refresh',
      name: 'Refresh'
    },
    {
      url:'/addRequisition',
      name:'Add Requisition'
    },
    {
      url:'/addIndent',
      name:'Indent Add'
    }

    ];

  ngOnInit() {
  }

}
