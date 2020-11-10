import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-addreviews',
  templateUrl: './addreviews.component.html',
  styleUrls: ['./addreviews.component.css']
})
export class AddreviewsComponent implements OnInit {
  // @Input() reviewid: number
  // id:string
  private id;
  employees :employee[]
  private reviewid;
  private mode='create';
  private postid:string;
  public employeeSub:Subscription;
  isLoading=false;
  employee :employee;

  // public id:string;   //id of the employee

  constructor(public empservice: EmployeeService,public route:ActivatedRoute) { }
  addreview(id, review ){

    console.log(this.employee.performanceReview)
    this.employee.performanceReview.push(review);
    this.empservice.updateEmp(id,this.employee.employeeid,this.employee.employeename,this.employee.department,this.employee.performanceReview);
   
  } 

  updatereview(id,reviewid,review){
    this.employee.performanceReview[reviewid]=review;
    this.empservice.updateEmp(this.employee.id,this.employee.employeeid,this.employee.employeename,this.employee.department,this.employee.performanceReview);


  }

    onsavereview(form : NgForm){
      if(form.invalid){
        return
      }
      let reviewtemp = JSON.stringify(form.value.review)

      this.isLoading=true;
      if(this.mode=='create'){
        this.addreview(this.id,form.value.review);
       }
      else{
        this.updatereview(this.id,this.reviewid,form.value.review);
      }
      form.reset()
    }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.id=paramMap.get('id')
      this.empservice.getemployee(this.id).subscribe((emp)=>{
        // this.isLoading=false;
        this.employee={
          id: emp._id,
          employeeid:emp.employeeid,
          employeename: emp.employeename,
          department: emp.department,
          performanceReview: emp.performanceReview
  
        };
  
      });
      if(paramMap.has('rid')){
        this.reviewid=paramMap.get('rid');
        this.mode='edit'
    // this.reviews=this.empservice.getreviews(this.eid);
 } });
//  this.employeeSub=this.empservice.getPostUpdateListener().subscribe((employees: employee[] )=>{
//   this.isLoading=false;
//   this.employees=employees;
// });
   
  
}

  
}
