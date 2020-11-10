
import { Component, OnInit,Input, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { reviewlist } from '../reviewlist.model';
// import { Review } from '../post.model';
// import { PostsService } from '../posts.service';
// import {Subscription} from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent  implements OnInit,OnDestroy {
  employeereviewlist:reviewlist;
  employee:employee;
  id; //get id by param
  private esub:Subscription;
  private rsub:Subscription;


  constructor(public empservice:EmployeeService,public route:ActivatedRoute){
    console.log(this.id)

  }
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
    // this.reviews=this.empservice.getreviews(this.eid);
    this.esub=  this.empservice.getemployee(this.id).subscribe((emp)=>{
      // this.isLoading=false;
      this.employee={
        id: emp._id,
        employeeid:emp.employeeid,
        employeename: emp.employeename,
        department: emp.department,
        performanceReview: emp.performanceReview

      };

    });

    this.rsub= this.empservice.getreviewlist(this.id).subscribe((r)=>{
      this.employeereviewlist={
        id:r.id,
        pendingreviews:r.pendingreviews,
        feedback:r.feedback
      }
    })}
});




  }
  ngOnDestroy(){
    this.esub.unsubscribe();
    this.rsub.unsubscribe();
  }

}