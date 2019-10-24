import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/Services/supplier.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';

interface Supplier{
    created_at: Date,
    supplier_name:string,
    mob_num:number,
    address:string,
    email:string,
    gstin:string,
    id: number,
    user_id  :number,
    total_supplier_balance: number,
    total_supplier_credit: number,
    total_supplier_debit: number, 
    email_verified_at: Date,
    status:boolean,
    updated_at: Date
  };

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.css']
})
export class SupplierSearchComponent implements OnInit {

  constructor(private supplierService:SupplierService,private excelService:ExcelService) { }
  public brads = [
    {
      url: "/addSupplier",
      name: "Add Supplier" 
    },
      {
      url: "/searchSupplier",
      name: "Supplier List"
    }
  ];
  public form = { 
    supplier_name:null,
    mob_num:null,
    address:null,
    email:null,
    gstin:null,
  };
  public componentTitle="Supplier List"
  public supplierListFromDatabase:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Supplier>();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['id', 'supplier_name','mob_num','address','email','gstin','created_at','update'];
  public dataForUpdate:any=[];
  public messageAfterUpdate:any=[];
  public submitClicked=0;
  public errorAfterUpdate:any=[];
  ngOnInit() {
    this.supplierService.get().subscribe(
      data=>this.handleResponse(data)
      );
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.supplierListFromDatabase, 'supplier');
  }
  public handleResponse(data)
  {
    this.supplierListFromDatabase=data;
    this.dataSource.data= data as Supplier[];
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public redirectToUpdae(data)
  {
    this.dataForUpdate=data;
  }
  onSubmit() {
    this.submitClicked = 1;
    this.supplierService.update(this.dataForUpdate,this.dataForUpdate.id).subscribe(
    data => this.handleSubmitResponse(data),
    error => this.handleSubmitError(error)
    );
 }
  public handleSubmitResponse(data) {
    this.submitClicked = 0;
    this.messageAfterUpdate = data;
    this.errorAfterUpdate=[];
  }
  public handleSubmitError(error) {
    this.submitClicked = 0;
    this.errorAfterUpdate = error;
  }

}
