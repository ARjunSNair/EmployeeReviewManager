import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { nextTick } from 'process';
import { Observable, Subscription } from 'rxjs';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';



@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeeReviewlistComponent implements OnInit,OnDestroy {
  public employee :employee;
  public indexarray: number[];
  public employeesSub:Subscription;
  constructor(public empservice:EmployeeService,public route: ActivatedRoute) { }
   id

   
  ngOnInit(): void {


    const b=this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
    // this.reviews=this.empservice.getreviews(this.eid);
     this.employeesSub= this.empservice.getemployee(this.id).subscribe(
      (emp)=>{
      // this.isLoading=false;
      this.employee={
        id: emp._id,
        employeeid:emp.employeeid,
        employeename: emp.employeename,
        department: emp.department,
        performanceReview: emp.performanceReview

      };

    },
    // err => { console.log(err) },
    // ()=>{ 
    //   for(let i=0;i<this.employee.performanceReview.length;i++){
    //   this.indexarray.push(+i);}
    //   console.log('completed')}
 
 
    
    
    );



  }
});


  // console.log("indexa=",this.indexarray)
//
  

}

ngOnDestroy(){
  this.employeesSub.unsubscribe();

}

}
