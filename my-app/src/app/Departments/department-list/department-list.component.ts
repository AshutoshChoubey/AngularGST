import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { DepartmentServiceService } from './../../Services/department-service.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from './../../Services/excel.service';

 interface Department{
created_at: Date,
department: string,
description: string,
id: number,
};

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
 
  constructor(private departmentService:DepartmentServiceService,
    private excelService:ExcelService
    ) { }
  componentTitle='List Department';
  public departmentLists=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Department>();
  @ViewChild(MatSort) sort: MatSort;
  dataForUpdate:object=[];
  submitClickedForUpdate=0;
  submitButtonClickedForUpdate=0;
  messageAfterUpdate:object=[];
  public displayedColumns = ['id', 'department','description','created_at','update'];
  public brads = [
    {
      url: "/addDepartment",
      name: "Add Department"
    },
     {
      url: "/listDepartment",
      name: "Department List"
    }
    ]; 

  ngOnInit() {
      this.departmentService.getProductDepartment().subscribe(
      data=>this.handleResponse(data)
      );
  }
  public form = {
    department:null,
    description:null
  };
  // generateExcel() {
  //   this.excelService.generateExcel();
  // }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.departmentLists, 'Department List');
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public handleResponse(data)
  {
    // consoles.log(data);
    this.dataSource.data= data as Department[];
    this.departmentLists=data;
    // console.log( this.dataSource.data);
    
  }
  public redirectToUpdae(data)
  {
    this.dataForUpdate=data;
    // console.log(data);
  }
 
  public onSubmitForUpdate(id) {
    this.submitButtonClickedForUpdate=1;
    this.departmentService.update(this.dataForUpdate,id).subscribe(
    data=>this.handleSubmitResponse(data),
    error =>this.handleSubmitError(error)
    );
  }
  public handleSubmitResponse(data)
  {
    this.submitButtonClickedForUpdate=0;
    this.messageAfterUpdate=data;
  }
  public handleSubmitError(error)
  {
    this.submitButtonClickedForUpdate=0;
    this.messageAfterUpdate=error;
    //   console.log(this.messageAfterUpdate);
    // console.log(this.messageAfterUpdate.error.errors.department[0]);
    // console.log(this.messageAfterUpdate.error.message)
  }


}
