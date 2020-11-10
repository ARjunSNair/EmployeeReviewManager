import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';
import { reviewlist } from 'src/app/reviewlist.model';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-assignemployee',
  templateUrl: './assignemployee.component.html',
  styleUrls: ['./assignemployee.component.css']
})
export class AssignemployeeComponent implements OnInit {

  @Input() reviewid: number;
  
  // eid:string
  // id:string;
  id:string;
  idtemp:string;
  //for each employee extract their eid and add to select option
  //get employees first
  //map id emip reviewid to selected id 

  selectedOption: string; 
  printedOption: string;

  // reviewlist_of_an_employee : reviewlist;
  public employeereviewlist :reviewlist;
  optionSelected : any;
  private emloyeesSub1:Subscription;
  private emloyeesSub2:Subscription;
  public assignSub:Subscription;
  employees :employee[]=[];
  employee:employee;


  constructor(private empservice:EmployeeService,private route:ActivatedRoute) { }



  // updatereviewlist(id,review){
  //   console.log("employeereviewlist is ",this.employeereviewlist);
  //   this.employeereviewlist.pendingreviews.push(review);
  //   this.empservice.updateEmpreviewlist(id,this.employeereviewlist.pendingreviews,this.employeereviewlist.feedback);
  // }

//final get reviewlist of asgned employeeees and then update then the project is complete 
  onassign(){
    const rid=this.reviewid;
    const assignedid=this.optionSelected;
    const currentid=this.id
    const reviewtemp=this.employee.performanceReview[rid];
    this.empservice.getreviewlist(assignedid).subscribe((empr)=>{
      // this.isLoading=false;
      this.employeereviewlist={
        id: empr.id,
        pendingreviews:empr.pendingreviews,
        feedback: empr.feedback,


      };
      console.log(reviewtemp);
      console.log(this.employeereviewlist.pendingreviews);
      this.employeereviewlist.pendingreviews.push(reviewtemp);
      console.log(this.employeereviewlist.pendingreviews);
      this.empservice.updateEmpreviewlist(this.employeereviewlist.id,this.employeereviewlist.pendingreviews,this.employeereviewlist.feedback);
      // console.log("employee revielist of ->" ,assignedid,"is ",this.employeereviewlist.id)
      // console.log(rid,assignedid,currentid)

      // // this.empservice.addtoreviewlist(assignedid,reviewtemp);
      // console.log(this.employee.performanceReview[rid])
      // console.log(reviewtemp)

    });


  
   // post this to employee,assignedid
  
      // this.empservice.assignreview(this.optionSelected,this.id,this.reviewid);


  //assigned  emid reviewid
  }
  
  printit(){
    this.printedOption=this.optionSelected;
    console.log(this.printedOption,this.id,this.reviewid);
  }
 
  ngOnInit(): void {
//     this.route.paramMap.subscribe((paramMap: ParamMap)=>{
//       this.idtemp=paramMap.get('id')

//  });
    this.empservice.getemployees();
    this.emloyeesSub1=this.empservice.getPostUpdateListener().subscribe((employees: employee[] )=>{

      this.employees=employees;

  });

  const b=this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if(paramMap.has('id')){
      this.id=paramMap.get('id');
  // this.reviews=this.empservice.getreviews(this.eid);
   this.emloyeesSub2= this.empservice.getemployee(this.id).subscribe(
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
// console.log("selected option is ",this.optionSelected);
// this.onassign();

}
ngOnDestroy(){
  this.emloyeesSub1.unsubscribe();
  this.emloyeesSub2.unsubscribe();

}

}
