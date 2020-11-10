import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  private employeeSub:Subscription;

  private mode='create';
  private id:string;
  isLoading=false;
  employee:employee;
  constructor(public empservice: EmployeeService, public route: ActivatedRoute) { }
  onSavePost(form: NgForm){
    if(form.invalid){
      return
    }
    this.isLoading=true;
    if(this.mode=='create'){

      this.empservice.addemp(form.value.eid, form.value.ename, form.value.dept);
      form.reset()
    }

  
    else{
      // console.log("inside edit",this.employee.employeename);
      this.empservice.updateEmp(this.id,form.value.eid,form.value.ename,form.value.dept,[]);
      // console.log("inside edit",this.employee.employeename);
    }}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.id=paramMap.get('id');
        //add loadspinner
        this.isLoading=true;
        // this.post=this.postsService.getPost(this.postid);
        this.empservice.getemployee(this.id).subscribe((postdata)=>{
          this.isLoading=false;
          this.employee={
            id:postdata._id,
            employeeid: postdata.employeeid,
            employeename: postdata.employeename,
            department :postdata.department,
            performanceReview: postdata.performanceReview 

          };

        });
        

      }
      else{
        this.mode='create';
        this.id=null;
      }
    });


}}
