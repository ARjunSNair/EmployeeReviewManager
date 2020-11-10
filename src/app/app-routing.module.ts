import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddemployeeComponent } from './admin/employees/addemployee/addemployee.component';
import { AddreviewsComponent } from './admin/employees/employee.reviews/addreviews/addreviews.component';
import { EmployeeReviewlistComponent } from './admin/employees/employee.reviews/employeelist.component';
import { EmployeesComponent } from './admin/employees/employees.component';

import { EmployeeComponent } from './employee/employee.component';
import { FeedbackComponent } from './employee/feedback/feedback.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'admin/employees', component: EmployeesComponent},
  {path:'admin/employees/create', component: AddemployeeComponent},
  {path:'admin/employees/edit/:id', component: AddemployeeComponent},
  {path:'admin/employees/:id/reviews', component: EmployeeReviewlistComponent},
  {path:'admin/employees/:id/reviews/create',component: AddreviewsComponent},
  {path:'admin/employees/:id/reviews/:rid', component:AddreviewsComponent},
  {path:"employee/:id",component:EmployeeComponent},
  {path:"employee/:id/:prid/feedback",component:FeedbackComponent},
  // {path:'**', component:}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
