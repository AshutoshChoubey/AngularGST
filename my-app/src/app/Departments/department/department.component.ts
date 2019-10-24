import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from './../../Services/department-service.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  componentTitle='Add Department';
  constructor(private DepartmentService:DepartmentServiceService) { }
  public form = {
    department:null,
    description:null
  };
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
    submitClicked=0;
    submitResponse=[];
    submitError=[];
  ngOnInit() {
     this.submitClicked=0;
  }
  onSubmit() {
    this.submitClicked=1;
    this.DepartmentService.save(this.form).subscribe(
    data=>this.handleSubmitResponse(data),
    error =>this.handleSubmitError(error)
    );
  }
  public handleSubmitResponse(data)
  {
    this.submitClicked=0;
    this.submitResponse=data;
  }
  public handleSubmitError(error)
  {
    this.submitClicked=0;
    this.submitError=error;
  }
  
}
