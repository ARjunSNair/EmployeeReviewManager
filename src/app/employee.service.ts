import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { reviewlist } from './reviewlist.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public loggedin:boolean;
  public employeetoaddreviews:employee;
  public employeetogetreview:employee;
  public employees: employee[] = [];
  public employeereviewlists:reviewlist[]=[];
  public employeesUpdated =new Subject< employee[] >();
  public reviewlistsUpdated =new Subject< reviewlist[] >();
  public reviewlist_of_an_employee : reviewlist;
  public employeereviewlist : reviewlist;

  constructor(private http: HttpClient,private router: Router) { }
  
  getemployee(id:string){
    return this.http.get<{
      _id:string
      employeeid:string,
      employeename: string,
      department: string,
      performanceReview: string[]

    }>
    ("http://localhost:3000/api/admin/employees/"+id);

      }



  getempwithmailid(eid){
    return this.http.get<{
      _id:string
      employeeid:string,
      employeename: string,
      department: string,
      performanceReview: string[]

    }>
    ("http://localhost:3000/api/admin/employees/email/"+eid);
  }
    

  
 



  getreviewlist(id){
    return this.http.get<{
      id:string,
      // employeeid:string,
      pendingreviews:string[],
      feedback: string[]
  

    }>
    ("http://localhost:3000/api/employee/"+id);//an observable is returned

  }

  updateEmpreviewlist(assignedid:string,review: string[], feedback1: string[]){
    const  a: reviewlist ={ 
      // employeeid:revemp.employeeid,
      id: assignedid,
      pendingreviews:review,
      feedback: feedback1,

        
       };
  //  const emp: employee={id:id, title:title, content:content}  ;
   this.http.put("http://localhost:3000/api/employee/" + assignedid, a)
   .subscribe(  response=>{
     console.log(response)

  
    });

  }

  addfeedback(id:string,prid:number,empreviewlist:reviewlist){
    const emprtemp=empreviewlist;
    this.http.put("http://localhost:3000/api/employee/" + id+"/" +prid+"/feedback", emprtemp)
    .subscribe(  response=>{
      console.log(response)
 
   
     });


  }
 
  


  getemployees(){
    //  return  [...this.employees];
    this.http.get<{ message: string, employees: any }>('http://localhost:3000/api/admin/employees')
    .pipe(map((postData)=>{
      return postData.employees.map(emp=>{ return {
        id: emp._id,
        employeeid:emp.employeeid,
        employeename: emp.employeename,
        department: emp.department,
        performanceReview: emp.performanceReview

        }
        

      })

    }))
    
    .subscribe((alteredemployees)=>{
      this.employees = alteredemployees;
      this.employeesUpdated.next([...this.employees]);

    });

  }

  getPostUpdateListener(){
    return this.employeesUpdated.asObservable();
  }

  getReviewUpdateListener(){
    return this.reviewlistsUpdated.asObservable();
  }





  addemp(eid: string, ename: string, dept :string){
    const employee : employee ={ 

        id: null,
        employeeid: eid,
        employeename: ename,
        department : dept,
        performanceReview: []
          
         };


    // const post: employee={id: null, title:t, content:c} ;
    this.http.post<{message:string, id: string}>("http://localhost:3000/api/admin/employees", employee).subscribe((responseData)=>{
       const id = responseData.id;
       employee.id=id; 
       console.log(responseData.message)
       this.employees.push(employee);
       this.employeesUpdated.next([...this.employees]);
      //  this.addreviewlist(id);
  //     const employeereviewlist:reviewlist={
  //       id:id,
  //       pendingreviews:[],
  //       feedback:[]
        
  // }
  //   console.log("id afteradding employee",id)
  //     this.http.post("http://localhost:3000/api/employee/"+id,employeereviewlist).subscribe((response)=>{
  //       this.employeereviewlists.push(employeereviewlist);
  //      this.reviewlistsUpdated.next([...this.employeereviewlists]);

  //     });

      //  this.router.navigate( ["/"]);

    });



  }


  // getreviews()

  updateEmp(id:string,eid: string, ename: string, dept :string, reviews: string[]){
    const emp : employee ={ 

      id: id,
      employeeid: eid,
      employeename: ename,
      department : dept,
      performanceReview: reviews
        
       };
       console.log("array of reviews",emp.performanceReview)
  //  const emp: employee={id:id, title:title, content:content}  ;
   this.http.put("http://localhost:3000/api/admin/employees/" + id, emp).subscribe(  response=>{
    //  console.log(response)
    console.log(response);
    console.log(emp.performanceReview);
    const updatedemployees=[...this.employees];
    const oldpostindex=updatedemployees.findIndex(p=>p.id==emp.id);  
    if (oldpostindex){
      // emp.performanceReview=updatedemployees[oldpostindex].performanceReview;
      updatedemployees[oldpostindex]=emp;
    }
   
    // emp.performanceReview=updatedemployees[oldpostindex].performanceReview;
    // updatedemployees[oldpostindex]=emp;
    this.employees=updatedemployees;    
    this.employeesUpdated.next([...this.employees]);
    // this.router.navigate( ["/"]);
    })

  }

  deletepost(id :string){
    this.http.delete("http://localhost:3000/api/admin/employees/" + id)
    .subscribe(()=>{
      console.log("deleted")
      const updatedemployees=this.employees.filter(emp=>emp.id !=id);
      
      this.employees=updatedemployees;
      this.employeesUpdated.next([...this.employees]);

    })
  }

  


}
