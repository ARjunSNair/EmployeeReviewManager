import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { EmployeeComponent } from '../employee/employee.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  employee:employee;
  admin :boolean=false;
  isloading=false;
  loggedin=false;
  emailid:string;
  status:boolean;
  public id :string


  constructor(public empservice:EmployeeService,public route: ActivatedRoute,public router: Router,public logservice:LoginService ) {
    
    // console.log("constructor inside",this.emailid)
   }
   onlogin(form: NgForm){
    if(form.invalid){
      return
    }
    console.log(form.value.eid)

      if(form.value.eid==='admin@abc.com') {
        this.admin=true;
        this.logservice.login()
        this.status=this.logservice.getstatus();
        this.logservice.setuserstatus("Admin");
        console.log(this.status)
        this.router.navigate(['/admin/employees']);
        

        this.emailid='admin';
      }

      else{
        this.logservice.login()
        this.empservice.loggedin=true;
        this.status=this.logservice.getstatus();
        let loginidtemp = JSON.stringify(form.value.eid)
        this.emailid=form.value.eid;
        this.loggedin=true;
        console.log("this.emailid is",this.emailid)
  this.empservice.getempwithmailid(this.emailid).subscribe((emp)=>{
      // this.isLoading=false;
      this.employee={
        id: emp._id,
        employeeid:emp.employeeid,
        employeename: emp.employeename,
        department: emp.department,
        performanceReview: emp.performanceReview

      };
      this.id=emp._id;
      this.router.navigate(['/employee', this.id])
      this.logservice.setuserstatus(this.employee.employeename);
      // console.log("this.id is",this.id)

     } );



      }

      // form.reset()



   }
   resetlog(){
    this.loggedin=false;
  }
  ngOnInit(): void {
    


  }

  



}
