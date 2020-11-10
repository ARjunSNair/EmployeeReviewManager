import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';
import { reviewlist } from 'src/app/reviewlist.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  prid :number;
  id :string;
  private esub:Subscription;
  private rsub:Subscription;
  employeereviewlist:reviewlist;
  employee:employee;


  constructor(public empservice:EmployeeService,public route:ActivatedRoute,public router:Router) { }
  onsavefeedback(form : NgForm){
    if(form.invalid){
      return
    }
    let reviewtemp = JSON.stringify(form.value.feedback)
    console.log(form.value.feedback)
    this.rsub= this.empservice.getreviewlist(this.id).subscribe((r)=>{
      this.employeereviewlist={
        id:r.id,
        pendingreviews:r.pendingreviews,
        feedback:r.feedback
      }

      this.employeereviewlist.feedback.push(form.value.feedback);
      console.log(this.employeereviewlist.feedback);
      this.employeereviewlist.pendingreviews.splice(this.prid, 1);   
      this.empservice.updateEmpreviewlist(this.id,this.employeereviewlist.pendingreviews,this.employeereviewlist.feedback);
    });


    this.router.navigate(['/employee', this.id])
    form.reset()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

        this.id=paramMap.get('id');
        this.prid=+paramMap.get('prid');
        // this.reviews=this.empservice.getreviews(this.eid);
       this.esub=this.empservice.getemployee(this.id).subscribe((emp)=>{
          // this.isLoading=false;
          this.employee={
            id: emp._id,
            employeeid:emp.employeeid,
            employeename: emp.employeename,
            department: emp.department,
            performanceReview: emp.performanceReview
    
          };
    
        });
    



});
  }


  ngDestroy(){
    this.esub.unsubscribe();
    this.rsub.unsubscribe();
    

  }

}
