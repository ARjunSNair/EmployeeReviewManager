import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeereview';
  status;
  user;
 constructor(public empservice:EmployeeService, public logservice:LoginService, public router:Router,route:ActivatedRoute){ this.status=logservice.getstatus() }
  
 logout(){
   this.logservice.logout() 
   this.router.navigate(['/'])
  
    
  }
  getuserstatus(){
    this.user=this.logservice.getuserstatus()
    return this.user;
  }
  statusfunc(){
    return this.logservice.getstatus();

  }
 

  
}
