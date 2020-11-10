import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  
  
  isLoading=false;
  private emloyeesSub:Subscription;
  employees :employee[]=[];
  
  constructor(private empservice: EmployeeService) { }
  
  ngOnInit(): void {
    this.isLoading=true;
    // this.posts=
    this.empservice.getemployees();
    this.emloyeesSub=this.empservice.getPostUpdateListener().subscribe((employees: employee[] )=>{
      this.isLoading=false;
      this.employees=employees;
      console.log(employees)
    });
  
  
  }
    // this.employees=this.empservice.getemployees();
  //}
  ondelete(postsid :string){
    this.empservice.deletepost(postsid);
  }
  
  ngOnDestroy(){
    this.emloyeesSub.unsubscribe();
  }
}
